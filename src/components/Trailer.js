import React, { useState, useEffect } from 'react'
import axios from 'axios';
import trailer from "./trailer.css";
import ReactPlayer from 'react-player';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Trailer({detailID}) {

    // const [ID, setid] = useState({detailID});
    const [apidata, setapidata] = useState({});
    const [genres, setgenre] = useState({})
    const [videos, setvideos] = useState([])
    const [link, setlink] = useState('')
    const [vidcount, setvcount] = useState(0)


    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${{detailID}}?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US`).then(response => {
            //details api 
            // console.log(response.data)
            console.log( "props id -  "  +  detailID)
            setapidata(response.data)
            setgenre(response.data.genres);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${detailID}/videos?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US`).then(res => {
            //get videos api     
            let traildata = res.data.results
            console.log(traildata);

            if (traildata.length == 0) {
                setvideos([])
                return;
            }

            let filtdata = traildata.filter((vid) => {
                return vid.official != false
            })

            if (filtdata.length < 3) {
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
                // console.log("keys with - " + keys)
                //result i get - 
                // FfpBUelcFdo,6U8ikxgyn58,4dDljHr0DHw,sxp5yWfsutE,
                // J2_BA4UKENg,yzuecv_PSHg,gLyamuqjXZ8,idc0EOmKr30,_6oXTLMS__E,ecJRvz9nk-U
                // setvideos([...keys]);
                //setting the videos state
                // console.log("keys with v - " + videos)
                //result i get - 
                // [object Object],[object Object],[object Object],[object Object],[object Object],
                // [object Object],[object Object],[object Object],[object Object],[object Object]
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const nextvid = () => {
        let x = vidcount;
        let max = videos.length - 1;
        x += 1;
        console.log("max is - " + max)
        setvcount(x);
        if (x >= max) {
            x = 0;
            setlink(`https://www.youtube.com/watch?v=${videos[x]}`)
        }
        else {
            setlink(`https://www.youtube.com/watch?v=${videos[x]}`)
        }
        console.log("x is - " + x);
    }
    const prevvid = () => {
        let x = vidcount;
        let max = videos.length - 1;
        x -= 1;
        console.log(" max is - " + max)
        if (x == -1) {
            x = max;
            setlink(`https://www.youtube.com/watch?v=${videos[x]}`)
        }
        else {
            setlink(`https://www.youtube.com/watch?v=${videos[x]}`)
        }
        console.log(" x is  - " + x)
        setvcount(x);
    }


    // let name = apidata.belongs_to_collection
    return (
        <div>

            <div className='detailmain' >

                <div className='moviedetail' >
                    <div className='detail-name' >
                        <h3>  {apidata.id} </h3>
                        {/* <h3>  {name.name} </h3> */}
                        <h3>  {apidata.title} </h3>
                    </div>
                    <div className='detail-ratings' ></div>
                </div>


                <div className='picandvid'  >
                   
                    <div className='poster' >
                        <img style={{ width: '100%', height: '100%' }} src={`https://image.tmdb.org/t/p/original/${apidata.poster_path}`} />
                    </div>

                    <div className='trailervideo ' >
                        <ReactPlayer controls  height='100%' width='100%'  url={link} className='trailvideo' />
                        <Button  size="small" className='leftbtn' onClick={nextvid} > <ArrowBackIosIcon fontSize='large' /> </Button>
                        <Button className='rightbtn'   onClick={prevvid}  > <ArrowForwardIosIcon fontSize='large'  /> </Button>
                    </div>

                    

                </div>              

            </div>

        </div>
    )
}

export default Trailer