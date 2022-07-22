import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SortReviews = () => {
    const [sortBy] = useState(['created_at', 'comment_count', 'votes']);
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <article>
            {sortBy.map((data) => {
                return (
                    <button key={data} value={searchParams} onClick={() => {
                        let search = data;
                        setSearchParams(search, { replace: true})
                    }}>{data}</button>
                )
            })}
        </article>
    )
};

export default SortReviews;