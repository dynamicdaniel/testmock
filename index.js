import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import './mock'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: '',
      num: '',
      data: {}
    }
  }

  postAjax = () => {
    let { page, num } = this.state
    axios.get('/api', {
      params: {
        page,
        num
      }
    }).then(data => {
      console.log('postAjax', data)
      if (data && data.data) {
        this.setState({
          data: data.data
        })
      }
    })
  }

  render() {
    return <div>
      <p>
        <span>页码</span>
        <input
          name='page'
          value={this.state.page}
          onChange={e => {
            let value = e.target.value
            this.setState({
              page: value
            })
          }}
        />
      </p>
      <p>
        <span>数量</span>
        <input
          name='num'
          value={this.state.num}
          onChange={e => {
            let value = e.target.value
            this.setState({
              num: value
            })
          }}
        />
      </p>
      <button onClick={this.postAjax}>test</button>
      <pre>
        {
          JSON.stringify(this.state.data, null, 2)
        }
      </pre>
    </div>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)