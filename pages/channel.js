import 'isomorphic-fetch'
import Link from 'next/link'


export default class channel extends React.Component {
    static async getInitialProps({query}){
        let idChannel = query.id

        let [ reqChannel, reqAudios, reqSeries ] = await Promise.all([
            fetch(`https://api.audioboom.com/channels/${idChannel}`),
            fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips.mp3`),
            fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
        ])

        let dataChannel = await reqChannel.json()
        let channel = dataChannel.body.channel

        let dataAudios = await reqAudios.json()
        let audioClips = dataAudios.body.audio_clips

        let dataSeries = await reqSeries.json()
        let series = dataSeries.body.channels


        return {channel, audioClips, series}
    }


    render() {
        
        const {channel,audioClips, series} = this.props
        return (
            <>
                <header>
                Podcasts
                </header>
                <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} >
                    <div className="banner-content">
                        <h1>{channel.title}</h1>  
                    </div>  
                 </div>
                    
                <h2>Series</h2>
                <div className="channels">
                    {
                        series && series.map((serie) =>(
                            <Link href={`/series?id=${serie.id}`} prefetch key={serie.id}>
                                <a className="channel">
                                    <img src={serie.urls.logo_image.original} alt={serie.title} />
                                    <h2>{serie.title}</h2>
                                </a>
                            </Link>
                        ))
                    }
                </div>
                <h2>Ultimos Podcasts</h2>
                <div className="channels">
                    {
                        audioClips.map((audio) => (
                            <Link href={`/podcast?id=${audio.id}`} prefetch key={audio.id}>
                                <a className="channel podcast">
                                    <img src={audio.urls.image} alt={audio.title} />  
                                    <h2>{audio.title}</h2>
                                    <div className="meta">
                                        { Math.ceil(audio.duration / 60) } minute
                                    </div>
                                </a>
                            </Link>
                        ))
                    }
                </div>



                <style jsx>
                {`
                    header {
                    color: #fff;
                    background: #8756ca;
                    padding: 15px;
                    text-align: center;
                    }
                    .banner {
                    width: 100%;
                    padding-bottom: 25%;
                    background-position: 50% 50%;
                    background-size: cover;
                    background-color: #aaa;
                    position: relative;
                    }
                    .banner-content{
                    width: 100%;
                    background-color: black;

                    }
                    .banner-content h1{
                    margin: 0;
                    color: black;
                    position: absolute;
                    bottom: 0;
                    }
                    .channels{
                    display: grid;
                    grid-gap: 15px;
                    padding: 15px;
                    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
                    }
                    .channel{
                    display: block;
                    border-radius :3px;
                    box-shadow: 0px 2px 6px rgba(0,0,0,0, .15);
                    margin-bottom: 0.5em;
                    }
                    .channel img {
                    width: 100%;
                    }
                    h2{
                    padding: 5px;
                    font-size: 1.2em;
                    font-wight: 600;
                    margin: 0;
                    text-align: center;
                    }
                    .podcast {
                        display: block;
                        text-decoration: none;
                        color: #333;
                        padding: 15px;
                        border-bottom: 1px solid rgba(0,0,0,0.2);
                        cursor: pointer;
                      }
                      .podcast:hover {
                        color: #000;
                      }
                      .podcast h3 {
                        margin: 0;
                      }
                      .podcast .meta {
                        text-align: center;
                        color: #666;
                        margin-top: 0.5em;
                        font-size: 0.8em;
                      }
                `} 
                </style>
                <style jsx global>
                {`
                    body {
                    margin: 0;
                    font-family: system-ui;
                    }
                `}
                </style>
            </>
        );
    }
}