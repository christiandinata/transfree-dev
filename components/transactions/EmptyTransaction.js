import { IconTextLayout } from '../order/Pending';

export function EmptyTransaction(){
    return(
        <IconTextLayout
            icon = {"../static/images/Asset Web/transaction/file.svg"}
            title = {"No Transactions"}
            desc = {<p>You haven’t sent money using Transfree. Get started now and enjoy fast and cheap international money transfer. </p>}
            location = {"/order"}
            buttonText = {"Send Money"}
        />   
    )
};

export function EmptySearch(){
    return(
        <IconTextLayout
            icon = {"../static/images/Asset Web/transaction/file.svg"}
            title = {"Your Search is Not Found"}
            desc = {<p>We’ve searched every keyword that you typing, but did not match any keyword.</p>}
            location = {"/order"}
            buttonText = {"Send Money"}
        />   
    )
};
