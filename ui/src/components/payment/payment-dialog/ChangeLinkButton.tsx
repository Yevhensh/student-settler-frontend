import React from "react";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import ObjectUtils from "../../../util/ObjectUtils";

export default function ChangeLinkButton(props) {
    let history = useHistory();

    async function goToLinkIfPreconditionTrue() {
        const preconditionFunction = props.preconditionFunction;
        if (ObjectUtils.checkNull(preconditionFunction)) {
            history.push({
                pathname: props.link,
                state: props.state
            });
            return;
        }

        const condition = await preconditionFunction();
        if (condition) {
            history.push({
                pathname: props.link,
                state: props.state
            });
        }
    }

    return (
        <Button onClick={goToLinkIfPreconditionTrue} color={props.color}>
            {props.buttonName}
        </Button>
    );
}
