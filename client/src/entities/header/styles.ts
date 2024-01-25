import styled from "styled-components";

import Button from "shared/ui/Button";

export const Container = styled.div`
    height: 50px;

    display: flex;
    justify-content: space-around;
    top: 0;

    padding: 0 20px;

    background: #af5a76;
`;

export const Menu = styled.div`
    height: 40px;

    align-self: flex-end;

    a + a {
        margin-left: 4px;
    }
`;

export const LogoutButton = styled(Button)`
    align-self: center;
`;
