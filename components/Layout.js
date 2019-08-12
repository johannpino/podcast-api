import Link from 'next/link'
import Head from 'next/head'


export default class Layout extends React.Component {
    state = {};

    render() {
      const {children, title} = this.props
        return (
            <>
            <Head>
              <title>{title}</title>
              <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
            </Head>
                <header>
                    <Link href="/">
                        <a>
                            Podcast
                        </a>
                    </Link>
                </header>
              {children}
                <style jsx>
                  {`
                  header {
                    color: #fff;
                    background: #8756ca;
                    padding: 15px;
                    text-align: center;
                  }
                  header a {
                    color: #fff;
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