import React from 'react';
import styled from "styled-components";

const ModalBack = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgb(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
`;

const ModalContent = styled.div`
  height: 500px;
  width: 700px;
  position: relative;
  z-index: 2;

  background: white;
  border-radius: 5px;
  box-shadow: rgb(11 67 218 / 10%) 0px 4px 14px,
    rgb(107 118 131 / 20%) 0px 4px 14px;
`;

const ModalWindow = ({ children }: any) => (
  <ModalBack>
    <ModalContent>{children}</ModalContent>
  </ModalBack>
);

export default ModalWindow;
