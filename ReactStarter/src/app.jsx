var React = require('react');
var ReactDOM = require('react-dom');
// var fetch = require('fetch');

var url='http://127.0.0.1:8080/'

class PostDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {obj: null}
  }

  componentWillMount(){
    fetch(url+'blog/posts/'+this.props.pk).then((response)=>{
      if(response.status >= 400){
        throw new Error("Bad response from server");
      }
      return response.json();                
                                          }).then((data)=>{
                                            console.log(data);
        this.setState({obj:data})
                                            })
  }

  delete(){
    fetch(url + 'blog/posts/'+this.props.pk+'/', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.pk
      })
    })
  }

  render(){
    let content = ' ';
    let post = this.state.obj;
    if(post!=null){
      content= 
      <div className="ui inverted yellow raised segment" key={post.id}>
          
          <div className="ui grid">
                
                <div className='ui row'>

                  
                  <div className='ui two wide column'>
                    <a className="ui green ribbon label large ">{post.author}</a>
                  </div>

                  <div className='ui four wide column'>
                  </div>
                  
                  <div className='ui five wide column center aligned'>
                    <div className='ui big center aligned fluid'>{post.title}</div>
                  </div>


                  <div className='ui four wide column'>
                  </div>
                  

                  <div className='ui one wide column'>
                    <i className="ui ban icon" onClick={this.delete.bind(this)}></i>
                  </div>
                  
                </div>

                <div className='ui row'>
                    <div className='ui sixteen wide column'>
                      <div className="ui center aligned container">{post.text}</div>
                    </div>
                </div>
          </div>
          <br/> <br/>
              <div className="ui bottom attached label"> {post.created.split('T')[0]} &nbsp; {post.created.split('T')[1].split('.')[0]} </div>

        </div>

    }
     return <div> {content} </div>;
  }


}

class ListPosts extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {posts: []};
  }

  componentWillMount() {
    var that = this;
    fetch(url+'blog/posts/').then(function(response){
        if(response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data){
        that.setState({posts:data})
      })
  }

   render() {
   let content = ' ';
   var that = this;
   if(this.state.posts != undefined){
       content = this.state.posts.map((post) =>
          <PostDetail key={post.id} pk={post.id} />
        ) 
    }
    console.log(content);
   return <div className="ui inverted segment ">{content}</div>
  }


}

class WritePost extends React.Component{
  constructor(props){
      super(props);
      this.state = {title:'', text:''}
  }

  handlePostSubmit(){

    console.log(this.state.title, this.state.text);
    fetch('http://127.0.0.1:8080/blog/posts/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        text: this.state.text,
      })
  })

  }

  render() {
    return (
      <form className='ui container inverted center aligned fluid'>
        <div className='ui inverted input field '>
          <input type="text" id="title" ref='title' name="title" onChange={()=>this.setState({title:this.refs.title.value})} placeholder="What's the title, doc?"/> 
        </div>
        <br/>
        <div className='ui inverted input field'>
          <textarea name="title" ref='text' className='center' onChange={()=>this.setState({text:this.refs.text.value})} placeholder="Give us your honest opinion"/> 
        </div>
        <br/>
        <button className= 'ui green button' type="submit" onClick={this.handlePostSubmit} value="Submit" > Seend!! </button>
        <div className="ui inverted divider"></div>
      </form>
    );
  }

}

ReactDOM.render(  <ListPosts/>, document.querySelector('#container'));
ReactDOM.render(  <WritePost/>, document.querySelector('#newpost'));
