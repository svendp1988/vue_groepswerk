 <template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Alert us of any shortcomings or defects.<br />
      Our maintenance department will make the necessary repairs or adjustments within 24hrs.<br />
    </p>
    <h4 style="margin-bottom: 10px" >We can only act when we know there is a problem.</h4>
    <h3 style="margin-top: 10px">Please submit your notifications !</h3>
    <img src="@/assets/PXL-logo2.png" alt="PXL-logo" width="400" height="300"/>
    <ul>
      <li>
        <a href="https://www.pxl.be" target="_blank" rel="noopener"
        >PXL-home</a
        >
      </li>
      <li>
        <a href="https://github.com/svendp1988" target="_blank" rel="noopener"
          >github</a
        >
      </li>
      <li>
        <a href="https://www.facebook.com/HogeschoolPXL" target="_blank" rel="noopener"
          >facebook</a
        >
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
