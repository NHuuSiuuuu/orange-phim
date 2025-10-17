import { useState, useEffect } from "react";

// Hook nhận 1 đối số là hàm lấy phim gì đấy?

export function useFilms(apiFunction) {
    const [films, setFilms] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await apiFunction();
                setFilms(result.data.items);
            } catch (error) {
                console.log("Error fetching  films: ", error);
                setFilms([]);
            }finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [apiFunction]);
    // console.log(films)
    return {films, loading}
}
