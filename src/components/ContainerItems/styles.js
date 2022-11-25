import styled from "styled-components"

export const ContainerItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 427.28px;
    height: ${props => props.searched ? '100vh' : '40vh'};
    background: rgba(255, 255, 255, 0.3);
    border-radius: 18.5429px;
    gap: ${props => props.searched ? '5px' : '20px'};

    input {
        text-align: center;
    }

    .mainInfo {
        font-size: 18px;
        line-height: 21px;
        color: #FFFFFF;
        text-shadow: -1.85429px 2.78143px 0.927143px rgba(0, 0, 0, 0.1);  
    }

    .mainTemp {
        font-size: 82px;
        line-height: 90px;
        color: #FFFFFF;
        text-shadow: -3.70857px 7.41714px 46.3571px rgba(0, 0, 0, 0.1);
    }

    .error {
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FF0000;
    }

    .complementaryInfo {
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        color: #FFFFFF;
        text-shadow: -1.85429px 2.78143px 0.927143px rgba(0, 0, 0, 0.1);
    }
`