import React, {Component} from 'react'
import 'isomorphic-fetch'
import Link from 'next/link'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'

class Index extends Component {
    static async getInitialProps(){
      let req = await fetch('https://api.audioboom.com/channels/recommended')
      let {body: channels} = await req.json()
      return {channels}
    }

    render(){
        const { channels } = this.props
        return (
          <>
          <Layout title="Podcasts">
            <ChannelGrid channels={channels}/>
          </Layout>           
          </>
        )        
    }
}

export default Index