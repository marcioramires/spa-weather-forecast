import React from "react";

import { ContainerItems as Container } from './styles'

function ContainerItems({children, ...props}){

    return <Container {...props}>{children}</Container>
}

export default ContainerItems