import styled from 'styled-components';

export const CustomButton = styled.button`
  display: block;
  width: 100%;
  max-width: 200px;
  padding: 8px 16px;
  background-color: var(--color-button); /* Color verde constante */
  color: var(--color-button-text);
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    background-color: var(--color-button); /* Mismo color verde en todos los estados */
    color: var(--color-button-text); /* Mantener el color del texto */
  }

  margin: 0 auto; /* Centrar el botón */
`;


export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrar los elementos dentro del formulario */
  width: 100%;
`;

export const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;


export const Background = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Cards = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: var(--color-componentes);
  border: 1px solid var(--color-contorno);
  border-radius: 15px;
  padding: 1%;
  margin: 2%;

  @media only screen and (min-width: 600px) {
    max-width: 100%;
  }
`;

export const VerifyCards = styled.div`
  width: 350px;
  height: 280px;
  background-color: var(--color-componentes);
  border: 1px solid var(--color-contorno);
  border-radius: 15px;
  padding: 5px;

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const Banner = styled.div`
  width: 1500px;
  height: 50px;
  background-color: var(--top-banners);
  border-radius: 2px;
  padding: 5px;
  position: fixed;
  top: 0;
  left: 0;

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const BannerSearch = styled.input`
  width: 100%;
  display: flex;
  height: 55px;
  padding: 2%;
  background-color: var(--color-searcher);
  border-radius: 15px;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const Buttons = styled.div`
  width: 170px;
  height: 55px;
  background-color: var(--color-componentes);
  border: 1.5px solid var(--color-contornoButtons);
  padding: 5px;

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const ButtonsLogIn = styled.div`
  width: 180px;
  height: 55px;
  background-color: var(--color-componentes);
  padding: 5px;
  box-shadow: 0px 5px 8px var(--color-shadow);

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

