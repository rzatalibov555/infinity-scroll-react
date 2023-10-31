  // const [todo, setTodos ] = useState({
    //     items: Array.from({ length: 3 })
    // });


    // function fetchMoreData() {
    //     {
    //         // a fake async api call like which sends
    //         // 20 more records in 1.5 secs
    //         setTimeout(() => {
    //             setTodos({
    //                 items: todo.items.concat(Array.from({ length: 3 }))
    //             });
    //         }, 1500);
    //     };
    // }

// import { fetchMoreData } from 'react';

import './Image.css'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, fetchMoreData, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';






function Image() {

  

    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        // Fetch data from the API
        fetch(`https://picsum.photos/v2/list?page=${page}&limit=3`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length === 0) {
                    setHasMore(false);
                } else {
                    setTodos([...todos, ...data]);
                    setPage(page + 1);
                }
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchMoreData();
    }, []); // Fetch data when the component mounts

    // Sekili yuklemek ucun START ========================================
    const downloadImage = (url) => {
          
        fetch(url)
          .then((response) => response.blob())
          .then((blob) => {
             
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');

            a.href = url;
            a.download = 'image.jpg'; // You can set the filename here
            a.click();
            window.URL.revokeObjectURL(url); //destroy link
            // console.log(window.URL.revokeObjectURL(url));
          });
      };


    // Sekili yuklemek ucun END ========================================



    return (

        <div className='image'>
            <InfiniteScroll
                dataLength={todos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                {todos.map((item, index) => (

                    <div className="image">

                        {/* <LazyLoadImage key={index} height={200} offset={100}> */}
                            <img src={item.download_url} alt={`Image ${index}`} />
                        {/* </LazyLoadImage> */}

                        <div className='pr'>
                            <button type='button' onClick={() => downloadImage(item.download_url)}>Download</button>
                        </div>

                    </div>

                ))}
            </InfiniteScroll>
        </div>

    )


}

export default Image;
