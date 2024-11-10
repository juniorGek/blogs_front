import {Loader} from "../../components/common/preloader";

const Loading = () => {
    return (
        <>
            <div id="preloader" style={{background: '#12121233'}}>
                <Loader/>
            </div>
        </>
    )
}

export default Loading