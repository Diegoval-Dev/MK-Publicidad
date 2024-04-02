/*Referencia: https://www.w3schools.com/css/css_rwd_mediaqueries.asp */
import styled from 'styled-components';
import '../styles/styles.css'

export const Background = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;

    @media (max-width: 800px) {
        flex-direction: column;
    }
`;

export const Cards = styled.div`
    width: auto;  /*250px*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto; /*350px*/
    background-color: var(--color-componentes);
    border: 1px solid var(--color-contorno);
    border-radius: 15px;
    padding: 1%;
    margin: 2%;
    
    @media only screen and (min-width: 600px) {
        max-width: 100%; /* Se le cambia el ancho máximo a 100% si el ancho de la pantalla es => a 600px */
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
        width: 100%; /* Se le cambia el ancho a 100% cuando el ancho de la pantalla es <= a 767px */
    }
`;

export const Banner = styled.div`
    width: 1500px; 
    height: 50px; 
    background-color: var(--top-banners);
    border-radius: 2px; 
    padding: 5px; 
    position: fixed; 
    top: 0; /* Distancia desde la parte de arriba de la pantalla en rem*/
    left: 0; /* Distancia desde el lado izquierdo de la pantalla en rem*/

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
    border-radius: 2px; 
    align-items: center;
    justify-content: center;
    border-radius: 15px;

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