import {EmptyState} from "@shopify/polaris";
import Loader from "@common/Loader";


export interface IEmptyState {
    show: boolean;
    loading: boolean;
}

/**
 *
 * @param show
 * @param loading
 * @constructor
 */
export default function EmptyStateMarkup({show, loading}: IEmptyState): JSX.Element {

    return (show && !loading)
        ? <EmptyState
            heading="Not found"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl9DN9irguvWfsYs5L3jiXISDvycmclpp1HQ&usqp=CAU"
        />
        : <Loader/>;
}
