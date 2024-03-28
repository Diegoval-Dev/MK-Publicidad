import styled from 'styled-components';
import './assets/styles/styles.css'

export const Cards = styled.div`
    width: auto; /* 250px/
    height: auto; /*350px*
    background-color: var(--color-componentes);
    border: 1px solid var(--color-contorno);
    border-radius: 15px;
    padding: 5px
`;

export const VerifyCards = styled.div`
    width: 350px;
    height: 280px;
    background-color: var(--color-componentes);
    border: 1px solid var(--color-contorno);
    border-radius: 15px;
    padding: 5px
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
`;

export const BannerSearch = styled.div`
    width: 950px; 
    height: 55px; 
    background-color: var(--color-searcher);
    border-radius: 2px; 
    padding: 5px; 
    border-radius: 15px;
`;

export const Buttons = styled.div`
    width: 170px; 
    height: 55px; 
    background-color: var(--color-componentes);
    border: 1.5px solid var(--color-contornoButtons);
    padding: 5px; 
`;

export const ButtonsLogIn = styled.div`
    width: 180px; 
    height: 55px; 
    background-color: var(--color-componentes);
    padding: 5px; 
    box-shadow: 0px 5px 8px var(--color-shadow);
`;