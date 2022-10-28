import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./trailer.css";
import ReactPlayer from 'react-player';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import nocast from './nocast.jpg';


function Trailer({}) {

    const [ID, setid] = useState(localStorage.getItem('movie-Id'));
    const [apidata, setapidata] = useState({});
    const [credit, setcredit] = useState([])
    const [videos, setvideos] = useState([])
    const [link, setlink] = useState('')
    const [vidcount, setvcount] = useState(0)
    const [allcast, setcast] = useState(false)


    useEffect(() => {

        axios.get(`https://api.themoviedb.org/3/movie/${ID}?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US`).then(response => {
            //details api 
            console.log(response.data)
            // let data = JSON.parse(localStorage.getItem('movie-detail') || '[]')

            setapidata(response.data);
        }).catch(err => {
            console.log(err);
        })
    },[])

    useEffect(() => {
        //get videos api     

        axios.get(`https://api.themoviedb.org/3/movie/${ID}/videos?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US`).then(res => {
            let traildata = res.data.results
            console.log(traildata);

            if (traildata.length == 0) {
                setvideos([])
                return;
            }

            let filtdata = traildata.filter((vid) => {
                return vid.official != false
            })

            if (filtdata.length < 5) {
                let keys = traildata.map((v) => {
                    return v.key
                })
                setlink(`https://www.youtube.com/watch?v=${keys[0]}`)
                setvideos([...keys]);
                console.log(" keys without - " + keys)
            }
            else {
                let keys = filtdata.map((v) => {
                    return v.key
                })
                setlink(`https://www.youtube.com/watch?v=${keys[0]}`)
                setvideos([...keys]);
            }
        }).catch(err => {
            console.log(err);
        })
    },[])

    useEffect(() => {
        //get cast details api from Id of the movie.
        axios.get(`https://api.themoviedb.org/3/movie/${ID}/credits?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US`).then(res => {
            let data = res.data

            // let cl = data.cast.length;
            
            if (allcast == false) {
                data.cast = data.cast.slice(0, 6);
            }
            setcredit(data);




            // console.log(credit);
            console.log(data)
        }).catch(err => {
            console.log(err);
        })


    }, [allcast])

    const nextvid = () => {
        let x = vidcount;
        let max = videos.length - 1;
        x += 1;
        // console.log("max is - " + max)
        setvcount(x);
        if (x >= max) {
            x = 0;
            setlink(`https://www.youtube.com/watch?v=${videos[x]}`)
        }
        else {
            setlink(`https://www.youtube.com/watch?v=${videos[x]}`)
        }
        // console.log("x is - " + x);
    }
    const prevvid = () => {
        let x = vidcount;
        let max = videos.length - 1;
        x -= 1;
        // console.log(" max is - " + max)
        if (x == -1) {
            x = max;
            setlink(`https://www.youtube.com/watch?v=${videos[x]}`)
        }
        else {
            setlink(`https://www.youtube.com/watch?v=${videos[x]}`)
        }
        // console.log(" x is  - " + x)
        setvcount(x);
    }

    const handleallcasts = () => {
        if (allcast === false) {

            setcast(true);
        }
        else {
            setcast(false);
        }
    }


    // let name = apidata.belongs_to_collection
    return (
        <div style={{ marginBottom: '3vh' }} >

            <div className='detailmain' >

                <div className='moviedetail' >
                    <div className='detail-name' >
                        {/* <h3>  {apidata.id} </h3> */}
                        {/* <h3>  {name.name} </h3> */}
                        <h2>  {apidata.title} </h2>
                        {apidata.api != "" && (<h6> {apidata.tagline} </h6>)}
                    </div>
                    <div style={{ display: 'flex' }} >
                        <div className='runtime '>
                            <h6  > {apidata.runtime}Min </h6>
                        </div>
                        <div className='detail-ratings' >
                            <StarIcon fontSize='large' /> {apidata.vote_average}
                            <div className='r-date' > Date - {apidata.release_date} </div>
                        </div>
                    </div>
                </div>


                <div className='picandvid'  >

                    <div className='poster' >
                        <img style={{ width: '100%', height: '100%' }} src={`https://image.tmdb.org/t/p/original/${apidata.poster_path}`} />
                    </div>

                    {videos.length != 0 &&
                        <div className='trailervideo ' >
                            <ReactPlayer controls height='100%' width='100%' url={link} className='trailvideo' />

                            <Button size="small" className='leftbtn' onClick={nextvid} > <ArrowBackIosIcon fontSize='large' /> </Button>
                            <Button className='rightbtn' onClick={prevvid}  > <ArrowForwardIosIcon fontSize='large' /> </Button>

                        </div>}

                </div>
                <div className='generes' >

                    {apidata.genres?.map((n) => {
                        return (
                            <div className='chip' >
                                {n.name}
                            </div>
                        )
                    })}
                </div>

            <div className='statusdiv' >
                    <div className='status'>
                        <h5> Status  </h5>
                        <h5> {apidata.status} </h5>
                    </div>

                    <div className='status' >
                        <h5> Original Language </h5>
                        <h5> {apidata.original_language} </h5>
                    </div>
                    <div className='status' >
                        <h5> Budget </h5>
                        { apidata.budget!=0 && <h5> ${apidata.budget} </h5>}
                    </div>
                    <div className='status' >
                        <h5> Revenue </h5>
                        { apidata.revenue!=0 && <h5> ${apidata.revenue} </h5>}
                    </div>
            </div>
            </div>

            


            <h4 style={{ marginLeft: '10%', marginTop: '1.5vh' }}  > Brief - </h4>
            <div className='brife' >
                <h6 className='brifeh6' >{apidata.overview}</h6>
            </div>
            {apidata.homepage != "" && (<div className='homepage'> you can also visit -    <a href={apidata.homepage} >{apidata.homepage} </a> </div>)}

            <h4 style={{ marginLeft: '10%', marginTop: '1.5vh' }}  > Production Companies - </h4>
            <div className='companies' >
                {
                    (apidata.production_companies?.map((n) => {
                        return (
                            <div className='company'>
                                {n.logo_path != null && <div>
                                    <img className='c-img' src={`https://image.tmdb.org/t/p/w500/${n.logo_path}`} />
                                </div>}
                                {n.name}
                            </div>
                        )
                    }))

                }
            </div>

            <h4 style={{ marginLeft: '10%', marginTop: '2vh' }}  > Top Casts :- </h4>
            {credit.cast?.length != 0 ?

                <div className='creditdiv' >
                    {
                        (credit.cast?.map((nn) => {
                            return (
                                <div className='cast' >
                                    {nn.profile_path != null &&
                                        <img className='castimg' src={`https://image.tmdb.org/t/p/w300/${nn.profile_path}`} />
                                    }
                                    <div >
                                        <h5> {nn.original_name} </h5>
                                        <h6> {nn.character} </h6>
                                    </div>
                                </div>
                            )
                        }))
                    }

                    <div onClick={handleallcasts} className="bn40div">
                        <a class="bn40"> {allcast === false ? "See More" : "See Less"}  </a>
                    </div>

                </div>
                 : 
                 <div className='creditdiv  ' >

                     <img className="nocastimg" src={nocast} /> 
                 </div>
             } 
        </div>
    )
}

export default Trailer