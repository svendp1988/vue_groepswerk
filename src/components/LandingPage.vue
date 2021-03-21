<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Come in for a glass of whisky, a cigar, throw some darts, get a haircut
      and hot towel shave!<br />
    </p>
    <h3>Stay in touch!</h3>
    <ul>
      <li>
        <a href="https://github.com/svendp1988" target="_blank" rel="noopener"
          >github</a
        >
      </li>
      <li>
        <a href="https:/facebook.com" target="_blank" rel="noopener"
          >facebook</a
        >
      </li>
    </ul>
  </div>
</template>

<style>
.hello {
  background-image: url("../../src/assets/banner.png");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #302F35;
}
</style>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
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
