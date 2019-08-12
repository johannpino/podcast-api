
import Link from 'next/link'

export default class SeriesList extends React.Component {
    state = {};

    render() {
        const {series} = this.props
        return (
            <>
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
                <style jsx>
                {`
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