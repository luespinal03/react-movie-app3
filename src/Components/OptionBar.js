import { useState, useEffect } from "react";
import '../App.css'


const OptionBar = (props) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("");

    // this useEffect is keeping an eye out for any changes that happen on limit, page, sortBy, order. When any of those parameters change it will trigger the useEffect, which will then trigger props.generateUrlParams(limit, page, sortBy, order) which will input the changes made into the url for the API to render the user the desired information.
    useEffect(() => {
        props.generateUrlParams(limit, page, sortBy, order)
    }, [limit, page, sortBy, order])

    return (
        <div>
            <label>Limit: </label>
            <input type="number" value={limit} onChange={(e) => { setLimit(e.target.value) }}></input>
            <br />

            <label>Page: </label>
            <input type="number" value={page} onChange={(e) => { setPage(e.target.value) }}></input>
            <br />

            <label>Sort by: </label>
            <select value={sortBy} onChange={(e) => { setSortBy(e.target.value) }}>
                <option value="id">id</option>
                <option value="title">title</option>
                <option value="createdAt">createdAt</option>
            </select>
            <br />

            <label>Order: </label>
            <select value={order} onChange={(e) => { setOrder(e.target.value) }}>
                <option value="id">id</option>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>


        </div>
    )
}

export default OptionBar