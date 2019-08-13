import 'isomorphic-fetch'
import Layout from '../components/Layout'
import PodcastList from '../components/PodcastList'
import SeriesList from '../components/SeriesList'
import Error from './_error';
import PodcastPlayer from '../components/PodcastPlayer'


export default class channel extends React.Component {
    
    state = {
        openPodcast: null,
    }
    
    static async getInitialProps({query, res}){
        let idChannel = query.id
        try{
            let [ reqChannel, reqAudios, reqSeries ] = await Promise.all([
                fetch(`https://api.audioboom.com/channels/${idChannel}`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips.mp3`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
            ])

            if(reqChannel.status >= 400){
                res.statusCode = reqChannel.status
                return {channel: null, audioClips: null, series: null, statusCode: reqChannel.status}
            }
    
            let dataChannel = await reqChannel.json()
            let channel = dataChannel.body.channel
    
            let dataAudios = await reqAudios.json()
            let audioClips = dataAudios.body.audio_clips
    
            let dataSeries = await reqSeries.json()
            let series = dataSeries.body.channels
    
            return {channel, audioClips, series, statusCode: 200}
        }catch(e){
            return {channel: null, audioClips: null, series: null, statusCode: 503}
        }

    }

    openPodcast = (e, podcast) => {
        e.preventDefault()
        console.log(podcast)
        this.setState({
            openPodcast: podcast,
        })
    }
    onCloseModal = e => {
        e.preventDefault()
        this.setState({
            openPodcast: null,
        })
    }

    render() {
        const {channel,audioClips, series, statusCode} = this.props
        const {openPodcast} = this.state
        // console.log(openPodcast)

            if(statusCode !== 200){
                return <Error statusCode={statusCode} />
            }
        return (
            <>
                <Layout title={channel.title}> 
                    <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} >
                        <div className="banner-content">
                            <h1>{channel.title}</h1>  
                        </div>  
                    </div>
                    {
                        openPodcast && 
                        <PodcastPlayer clip={openPodcast} 
                        onCloseModal={this.onCloseModal} />
                    }
                        
                    <SeriesList series={series} />
                    <PodcastList audioClips={audioClips} openPodcast={this.openPodcast} />
                </Layout>
                

                <style jsx>
                {`
                    
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
                    color: white;
                    background-color: black;
                    padding: 10px;
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
            </>
        );
    }
}