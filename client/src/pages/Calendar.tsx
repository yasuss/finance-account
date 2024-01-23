import React from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

import FullCalendar from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { setShowModal } from "../containers/ModalItem";
import { getDataById, makeTitle } from "../helpers";
import { editItem, getDataCalendarRequest } from "../requests";
import { State } from "../types";

export const Calendar = () => {
    const modalData = useSelector((state: State) => state.modalData);
    const {
        data: calendarData,
        startDate: startDateCalendar,
        endDate: endDateCalendar,
    } = useSelector((state: State) => state.calendarData);
    const userData = useSelector((state: State) => state.userData);
    const { startDate: startDateTable, endDate: endDateTable } = useSelector(
        (state: State) => state?.tableData,
    );
    const { startDate: startDateGraphs, endDate: endDateGraphs } = useSelector(
        (state: State) => state?.dataGraphs,
    );

    const handleDateSelect = (selectInfo: any) => {
        const date = new Date(selectInfo.dateStr);

        setShowModal(true, { date });

        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();

        getDataCalendarRequest(userData, {
            startDate: new Date(startDateCalendar),
            endDate: new Date(endDateCalendar),
        });

        if (modalData && Object.keys(modalData).length !== 0) {
            calendarApi.addEvent({
                title: makeTitle(modalData),
                start: date,
                allDay: true,
            });
        }
    };

    const handleEventClick = (clickInfo: any) => {
        ReactTooltip.hide();

        const id = clickInfo.event._def.publicId;

        const item = getDataById(id, calendarData);

        setShowModal(true, { ...item, editing: true });
    };

    const handleEventDrop = ({ event }: any) => {
        const id = event._def.publicId;
        const item = getDataById(id, calendarData);
        const date = new Date(event.start);

        editItem({
            item: { ...item, date },
            userData,
            tableDates: { startDate: startDateTable, endDate: endDateTable },
            calendarDates: { startDate: startDateCalendar, endDateCalendar },
            graphsDates: { startDate: startDateGraphs, endDate: endDateGraphs },
        });
    };

    const handleEventDidMount = (info: any) => {
        const { el, event } = info;
        const { comment } = event._def.extendedProps;
        const textPopover = comment || "-";
        el.setAttribute("data-tip", textPopover);
    };

    const handleEventMouseEnter = () => ReactTooltip.rebuild();

    return (
        <div>
            <ReactTooltip
                type='light'
                border
                borderColor='#af5a76'
                textColor='#af5a76'
            />
            {
                <FullCalendar
                    locale='en'
                    firstDay={1}
                    buttonText={{
                        today: "today",
                    }}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    selectable
                    dateClick={handleDateSelect}
                    initialEvents={[]}
                    events={(info, successCallback) => {
                        const { start, end } = info;
                        if (
                            (!startDateCalendar && !endDateCalendar) ||
                            (start.toISOString() !==
                                startDateCalendar.toISOString() &&
                                end.toISOString() !==
                                    endDateCalendar.toISOString())
                        ) {
                            getDataCalendarRequest(userData, {
                                startDate: new Date(start),
                                endDate: new Date(end),
                            });
                        }
                        successCallback(calendarData);
                    }}
                    selectMirror={true}
                    eventClick={handleEventClick}
                    eventDrop={handleEventDrop}
                    eventDidMount={handleEventDidMount}
                    eventMouseEnter={handleEventMouseEnter}
                />
            }
        </div>
    );
};
