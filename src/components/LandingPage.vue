<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Come in for a glass of whisky, a cigar, throw some darts, get a haircut
      and hot towel shave!
    </p>
    <h3>Stay in touch!</h3>
    <ul>
      <li>
        <a
          href="https://github.com/svendp1988"
          target="_blank"
          rel="noopener"
        >
          Github
        </a>
      </li>
      <li>
        <a
          href="https:/facebook.com"
          target="_blank"
          rel="noopener"
        >
          Facebook
        </a>
      </li>
    </ul>
  </div>
</template>

<style>
.hello {
  color: #302f35;
}
</style>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
