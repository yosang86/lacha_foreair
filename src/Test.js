import {useEffect, useRef} from "react";
import $ from 'jquery';

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    // const test = () => {
    //     $("#main").html(`
    //         <li data-type="1111">1111</li>
    //         <li data-type="2222">2222</li>
    //         <li data-type="3333">3333</li>
    //         <li data-type="4444">4444</li>
    //     `);
    //
    //     const children1 = document.getElementById("main").getElementsByTagName("li");
    //     for (const item of Object.values(children1)) {
    //         item.addEventListener("click", function(event){
    //         })
    //     }
    // }
    //
    // useEffect(() => {
    //     test();
    //     return test();
    // }, [])

    return(
        <>
            <div id="main"></div>
        </>
    )
}

export default App;