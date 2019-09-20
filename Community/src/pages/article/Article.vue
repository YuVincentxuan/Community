<template>
    <div class="content">
        <div class="container">
            <el-row :gutter="20">
                <el-col class="lt-box" :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
                    <div class="article-show" >
                        <div class="author-title">
                            <el-avatar class="header-img" :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            <div class="author-info">
                                <span class="author-name">臭屁辣妹</span>
                                <span class="author-time">2019年9月16日 18:43 阅读量 250</span>
                            </div>
                            <el-button class="follow-btn" size="mini" type="success">已关注</el-button>
                        </div>
                        <h1>我的题目-前端跨域问题前端跨域问题前</h1>
                        <article class="article" v-html="content">

                        </article>
                    </div>
                    <div class="comment-list">
                        <h3>用户评论</h3>
                        <div class="comment-item">
                           <article-comment></article-comment>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">
                    <div class="rt-box hot-tag">
                        <div class="rt-box-header">
                            <h3><i class="header-icon el-icon-user-solid"></i>关于作者</h3>
                        </div>
                        <div class="rt-box-body">
                            <el-avatar class="header-img" :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            <div class="author-info">
                                <span class="author-name">臭屁辣妹</span>
                                <span class="author-sign" title="我是一个没有感情的code killer">我是一个没有感情的code killer</span>
                            </div>
                            <div class="author-data">
                                <span class=""><i class="data-icon el-icon-star-on"></i>点赞 15</span>
                                <span class=""><i class="data-icon el-icon-s-order"></i>文章 1</span>
                            </div>
                           
                        </div>
                    </div>
                    <div class="rt-box author-rank">
                        <div class="rt-box-header">
                            <h3><i class="header-icon el-icon-user-solid"></i>作者排行榜</h3>
                        </div>
                        <div class="rt-box-body">
                            
                        </div>
                    </div>
                </el-col>       
            </el-row>
        </div>
    </div>    
</template>
<script>
import ArticleComment from './component/Comment'


export default {
    name:'Article',
    components:{
        ArticleComment
    },
    data(){
        return{
           content:`
      <h3><a id="_0"></a>跨域</h3> <p>只要协议、域名、端口有任何一个不同，都被当做是不同的域<br><br /> 注意：</p> <ol> <li>如果是协议和端口造成的跨域问题，“前台”是无能为力的</li> <li>在跨域问题上，域仅仅是通过“URL的首部”来识别而不会去尝试判断相同的ip地址对应着两个域或两个域是否在同一个IP上。</li> </ol> <h3><a id="documentdomain_5"></a>通过document.domain跨域</h3> <p>同源策略：</p> <blockquote> <p>其限制之一是不能通过ajax的方法去请求不同源中的文档。第二个限制是浏览器中不同的框架之间是不能进行js的交互操作的。不同框架之间是可以获取window对象的，但却无法获取相应的属性和方法。比如，有一个页面，它的地址是www.domonare.cn/a.html，在这个页面里面有一个iframe框架是不同域的，所以我们是无法通过在页面中书写js代码来获取iframe中的东西的。<br /> document.domain:<br /> 可以把www.damonare.cn/a.html和damonare.cn/b.html这两个页面的document.domain都设成相同的域名，但要注意的是，document.domain的设置是有限制的，我们只能把document.domain设置成自身或更高一级的父域，且主域必须相同。上面的例子可以将两个页面的document.domain都设为damonare.cn，然后通过主页面发送ajax请求iframe的资源。</p> </blockquote> <ul> <li>修改document.domain的方法只适用于不同子域的框架间的交互。</li> </ul> <h3><a id="locationhash_11"></a>通过location.hash跨域</h3> <p>因为父窗口可以对iframe进行url读写，iframe也可以读写父窗口的url，url有一部分被称为hash，就是#号及后面的字符，它一般用于浏览器锚点定位，server端并不关心这一部分，应该说HTTP请求过程中不会携带hash，所以这部分的修改不会产生HTTP请求，但会产生浏览器历史记录。此方法的原理就是改变url的hash部分来进行双向通信。每个window通过改变其他window的location来发送消息（由于两个页面不在同一个域下IE、Chrome不允许修改parent.location.hash的值，所以要借助于父窗口域名下的一个代理iframe），并通过监听自己的url的变化来接收消息。这个方式的通信会造成一些不必要的浏览器历史记录，而且有些浏览器不支持onhashchange事件，需要轮询来获知URL的改变，最后，这样做也存在缺点，诸如数据直接暴露在了url中，数据容量和类型都有限等。<br><br /> 假如父页面是baidu.com/a.html，iframe嵌入的页面为goole.com/b.html，要实现此两个页面间的通信可以通过以下方法。</p> <ol> <li>a.html传送数据到b.html</li> </ol> <blockquote> <p>a.html下修改iframe的src为google.com/b.html#paco<br /> b.html监听到url发生变化，触发响应操作</p> </blockquote> <ol start="2"> <li>b.html传送数据到a.html，由于两个页面不在同一个域下IE、Chrome不允许修改parent.location.hash的值，所以要借助于父窗口域名下的一个代理iframe。</li> </ol> <blockquote> <p>b.html下创建一个隐藏的iframe，此时iframe的src是baidu.com域下的，并挂上要传送的hash数据，如src=“www.baidu.com/proxy.html#…”<br /> proxy.html监听到url发生变化，修改a.html的url(因为a.html和proxy.html同域，所以proxy.html可修改a.html的url.hash)<br /> a.html监听到url发生变化，触发相应操作。</p> </blockquote> <h3><a id="HTML5postMessage_21"></a>通过HTML5的postMessage方法跨域</h3> <p>高级浏览器Internet Explorer 8+， Chrome，Firefox，Opera和Safari都将支持这个功能</p> <blockquote> <p>在HTML5中新增了postMessage的API，可以方便窗口跟内部iframe之间进行通信，并且可以实现跨主域通信。但是有一些限制，1.老版本的浏览器一般不支持。2.父窗口只能向iframe中发送消息，iframe只能接收消息，且父窗口不能直接操作iframe中的内容。3.父窗口发送的数据也是有限制的。只能发送基本数据类型或者plain object（简单对象）。<br /> 比如damonare.cn域的A页面通过iframe嵌入了一个google.com域的B页面，可以通过以下方式实现A和B的通信：<br /> <br><br /> A页面通过postMessage方法发送消息：</p> </blockquote> <pre><div class="hljs"><code class="lang-javascript"><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">var</span> ifr = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'ifr'</span>) <span class="hljs-keyword">var</span> targetOrigin = <span class="hljs-string">"http://www.google.com"</span> ifr.contentWindow.postMessage(<span class="hljs-string">'hello world'</span>,targetOrigin) } </code></div></pre> <p>postMessage的使用方法：</p> <blockquote> <p>otherWindow.postMessage(message, targetOrigin)<br /> otherWindow指目标窗口，也就是给哪个window发消息，是window.frames属性的成员或者由window.open方法创建的窗口<br /> message：是要发送的消息，类型为String、Object(IE8、9不支持)<br /> targetOrigin: 是限定消息接收范围，不限制请使用*<br /> B页面通过message事件监听并接收消息</p> </blockquote> <pre><div class="hljs"><code class="lang-javascript"><span class="hljs-keyword">var</span> onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{ <span class="hljs-keyword">var</span> data = event.data <span class="hljs-comment">// 消息</span> <span class="hljs-keyword">var</span> origin = event.origin <span class="hljs-comment">// 消息来源地址</span> <span class="hljs-keyword">var</span> source = event.source <span class="hljs-comment">// 源window对象</span> <span class="hljs-keyword">if</span> (origin == <span class="hljs-string">"http://www.baidu.com"</span>) { <span class="hljs-built_in">console</span>.log(data) } } <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.addEventListener != <span class="hljs-string">'undefined'</span>) { <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'message'</span>, onmessage, <span class="hljs-literal">false</span>) } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.attachEvent != <span class="hljs-string">'undefined'</span>) { <span class="hljs-built_in">window</span>.attachEvent(<span class="hljs-string">'onmessage'</span>, onmessage) } </code></div></pre> <p>同理，也可以B页面发送消息，然后A页面监听并接收消息</p> <h3><a id="jsonp_56"></a>通过jsonp跨域</h3> <blockquote> <p>单项跨域（一般用来获取数据），因为通过script标签引入的js是不受同源策略的限制的。所以我们可以通过script标签引入一个js或者是一个其他后缀形式（如php、jsp等）的文件，此文件返回一个js函数的引用。<br /> 比如，有个a.html页面，它里面的代码需要利用ajax获取一个不同域上的json数据，假设这个json数据地址damonare.cn/data.php，那么a.html中的代码就可以这样：</p> </blockquote> <pre><div class="hljs"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dosomething</span> (<span class="hljs-params">jsondata</span>) </span>{ <span class="hljs-comment">// 处理获取的json数据</span> } </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://example.com/data.php?callback=dosomething"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> </code></div></pre> <p>如果页面使用jquery，那么通过以下方法来进行jsonp操作</p> <pre><div class="hljs"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"> $.getJSON(<span class="hljs-string">'http://example.com/data.php?callback=?'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">jsondata</span>)</span>{ <span class="hljs-comment">// 处理获得的json数据</span> }) </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> </code></div></pre> <p>jquery会自动生成一个全局函数来替换callback=？中的问号，之后获取数据后又会自动销毁，实际上就是起一个临时代理函数的作用。$.getJSON方法会自动判断是否跨域，不跨域的话，就调用普通的ajax方法；跨域的话，则会以异步加载js文件的形式来调用jsonp的回调函数。</p> <ul> <li>jsonp的优缺点</li> </ul> <blockquote> <p>jsonp的优点：它不像XMLHttpRequest对象实现的ajax请求那样受到同源策略的限制，它的兼容性更好，咋更加古老的浏览器中都可以运行，不需要XMLHTTPRequest或ActiveX的支持，并且在请求完毕后可以通过调用callback的方式回传结果。<br /> jsonp的缺点：它只支持GET请求而不支持POST等其他类型的HTTP请求；它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行JavaScript调用的问题。</p> </blockquote> <h3><a id="cors_79"></a>通过cors跨域</h3> <blockquote> <p>CORS：跨域资源共享，定义了必须在访问跨域资源时，浏览器与服务器应该如何沟通。CORS背后的基本思想就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是失败。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10.整个cors通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，cors通信与同源的ajax通信没有差别，代码完全一样。浏览器一旦发现ajax请求跨域，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。<br /> 因此，实现CORS通信的关键是服务器。只要服务器实现了cors接口，就可以跨域通信。<br /> <br><br /> 平时的ajax请求：</p> </blockquote> <pre><div class="hljs"><code class="lang-javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest() xhr.open(<span class="hljs-string">'post'</span>, <span class="hljs-string">'/damonare'</span>, <span class="hljs-literal">true</span>) xhr.send() </code></div></pre> <p>以上damonare部分是相对路径，如果我们要使用cors，代码如下：</p> <pre><div class="hljs"><code class="lang-javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest() xhr.open(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'http://segentfault.com/u/trigkit4'</span>, <span class="hljs-literal">true</span>) xhr.send() </code></div></pre> <p>代码与之前的区别在于相对路径换成了其他域的绝对路径，也就是要跨域访问的接口地址。<br /> <br><br /> 浏览器将cors请求分为两类：简单请求和非简单请求。<br /> <br><br /> 只要同时满足以下两大条件，就属于简单请求：</p> <ol> <li>请求方法是以下三种方式之一：</li> </ol> <ul> <li>HEAD</li> <li>GET</li> <li>POST</li> </ul> <ol start="2"> <li>http的头信息不超过以下几种字段：</li> </ol> <ul> <li>Accept</li> <li>Accept-Language</li> <li>Content-Language</li> <li>Last-Event-ID</li> <li>Content-Type: 只限于三个值applicant/x-www-form-urlencoded、multipart/form-data、text/plain<br /> 凡是不同时满足上面两个条件，就属于非简单请求。</li> </ul> <h4><a id="_111"></a>简单请求的处理</h4> <p>对于简单请求，浏览器直接发出cors请求。具体来说，就是在头信息之中，增加一个origin字段。浏览器发现这次跨域ajax请求是简单请求，就自动在头信息之中，添加一个origin字段。origin字段用来说明，本次请求来自哪个源（协议+域名+端口）。服务器根据这个值，决定是否同意这次请求。<br /> <br><br /> 如果origin指定的源，不在许可范围之类，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段，就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码可能是200.<br /> <br><br /> 如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。</p> <pre><div class="hljs"><code class="lang-html">Access-Control-Allow-Origin:http://api.bob.com Access-Control-Allow-Credentials:true Access-Control-Expose-Headers:FooBar Content-Type:text/html;charset=utf-8 </code></div></pre> <p>上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头</p> <ol> <li>Access-Control-Allow-Origin<br /> 该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。</li> <li>Access-Control-Allow-Credentials<br /> 该字段可选。它的值是一个布尔值，表示是否允许发送cookie。默认情况下，Cookie不包括在Cors请求中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送cookie，删除该字段即可。</li> <li>Access-Control-Expose-Headers<br /> 该字段可选。Cors请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control Content-Language Content-Type Expires Last-Modified Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader(‘FooBar’)，可以返回FooBar字段的值。</li> </ol> <h4><a id="withCredentials_130"></a>withCredentials属性</h4> <p>cors请求默认不发送Cookie和HTTP认证信息。如果要把COOKIE发送到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。另一方面，开发者必须在Ajax请求中打开withCredentials属性。</p> <pre><div class="hljs"><code class="lang-javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest() xhr.withCredentials = <span class="hljs-literal">true</span> </code></div></pre> <p>否则，即使浏览器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。<br /> <br><br /> 但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显示关闭withCredentials。<br /> <br><br /> 需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。<br></p> <h3><a id="_141"></a>非简单请求</h3> <p>非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是applicant/json<br><br /> 非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为“预检”请求。浏览器先询问服务器，当前页面所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。<br /> <br><br /> 预检请求的HTTP头信息：</p> <pre><div class="hljs"><code class="lang-html">OPTIONS /cors HTTP/1.1 Origin:http://api.bob.com Access-Control-Request-Method:PUT Access-Control-Request-Headers:X-Custom-Header Host:api.alice.com Accept-Language:en-US connection:keep-alive User-Agent:Mozila/5.0... </code></div></pre> <p>预检请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。</p> <ol> <li>Access-Control-Request-Method<br /> 该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT</li> <li>Access-Control-Request-Headers<br /> 该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header</li> </ol> <h4><a id="_161"></a>预检请求的回应</h4> <p>服务器收到“预检”请求后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨域请求，就可以做出回应。<br /> <br><br /> HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨域请求。<br><br /> 如果浏览器否定了“预检”请求，会返回一个正常的HTTP响应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误。被XMLHttpRequest对象的onerror回调函数捕获。<br /> <br><br /> 服务器回应的其他CORS相关字段如下：</p> <pre><div class="hljs"><code class="lang-html">Access-Control-Allow-Methods:GET,POST,PUT Access-Control-Allow-Headers:X-Custom-Header Access-Control-Allow-Credentials:true Access-Control-Max-Age:1728000 </code></div></pre> <ol> <li>Access-Control-Allow-Methods<br /> 该字段必须，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法，这是为了避免多次“预检”请求。</li> <li>Access-Control-Allow-Headers<br /> 如果浏览器请求包括Access-Control-Request-Header字段，则Access-Control-Allow-Headers字段是必须的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在“预检”中请求的字段。</li> <li>Access-Control-Allow-Credentials<br /> 该字段与简单请求时的相同</li> <li>Access-Control-Max-Age<br /> 该字段可选，用来指定本次预检请求的有效期，单位为秒。在有效期期间，不用发出另一条预检请求。<br /> 服务器对于CORS的支持，主要是通过设置Access-Control-Allow-Origin来进行的。如果浏览器检测到相应的设置，就可以允许ajax进行跨域的访问。</li> </ol> <ul> <li>cors和jsonp对比</li> </ul> <blockquote> <p>jsonp只能实现GET请求，而cors支持所有类型的HTTP请求。<br /> 使用cors，开发者可以使用普通的XMLHttpRequest发起请求和获得数据，比起JSONP有更好的错误处理。<br /> jsonp主要被老的浏览器支持，它们往往不支持cors，而绝大多数现代浏览器都已经支持了cors<br /> cors与jsonp相比，更先进、方便和可靠</p> </blockquote> <h3><a id="windowname_188"></a>通过window.name跨域</h3> <blockquote> <p>window对象有个name属性，该属性有个特征：即在一个窗口（window）的生命周期内，窗口载入的所有的页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。</p> </blockquote>



               `
        }
    }
}
</script>
<style lang="stylus" scoped>
@import './article.styl';
.content
    background-color #f4f5f5
    position relative
    top 80px
    @media screen and (max-width: 1200px) {
        top 60px
    }
    .container
        width 80%
        margin 0 auto
        @media screen and (max-width: 1200px) {
            width: 100%;
        }
        .bg-center
            width 100%
            height 100px
            background-color #0106ff
    .lt-box
        background-color #fff
        .article-show
            width 100%
            border-bottom 1px solid rgba(178,186,194,.15)
            .author-title
                padding 10px
                .header-img
                    display inline-block
                    vertical-align top
                .author-info
                    display inline-block
                    margin-left 5px
                    width 60%
                    height 50px
                    line-height 25px
                    >span 
                        display block
                        cursor pointer
                        overflow hidden
                        white-space nowrap
                        text-overflow ellipsis
                    .author-name
                        color #000
                        font-size 20px
                        font-weight bold
                    .author-time
                        font-size 15px
                .follow-btn
                    float right
                    @media screen and (max-width : 1200px){
                        padding 7px
                    }
            h1
                color #000
                width 100%
                padding-bottom 15px
                border-bottom 1px solid rgba(178,186,194,.15)   
                margin-block-start 0 !important
                margin-block-end 0 !important
            .article
                padding 0 10px
        .comment-list
            padding 10px 0
            >h3
                padding 0 10px
                color #000
            .comment-item
                padding 10px
    .rt-box
        margin-bottom 10px
        background-color white
        .rt-box-header
            padding 10px
            vertical-align middle
            border-bottom: 1px solid rgba(178,186,194,.15)
            .header-icon
                padding-right 10px
                color #409EFF
        .rt-box-body
            padding 10px 20px
            .header-img
                display inline-block
                vertical-align top
            .author-info
                display inline-block
                width 60%
                height 60px
                line-height 30px
                >span 
                    display block
                    cursor pointer
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                .author-name
                    color #000
                    font-size 20px
                    font-weight bold
                .author-sign
                    font-weight bold
                    font-size 14px
            .author-data
                position relative
                padding 0 65px
                >span 
                    font-size 16px
                    font-weight bolder
                    margin 5px 0
                    display block
                .data-icon
                    padding-right 10px
                    color #000
            .tag-list
                padding 20px
                .tag-list-item
                    margin 2px 0
</style>