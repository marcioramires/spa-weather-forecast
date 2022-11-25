import styled from "styled-components"

export const ContainerItems = styled.div`
    display: flex;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

input {
    text-align: center;
}

ul {
    text-align: center;
}

p {
    color: #FF0000;
}
/* Utilities */

.error {
    border: 1px solid red !important;
}

.error::placeholder {
    color: red;
}
`