<template>
  <div class="container">
    <h1>devops实施情况信息维护页面</h1>
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="name">系统标识</label>
            <input type="text" v-model="devopsForm.systemkey" class="form-control" id="systemkey" placeholder="">
          </div>
          <div class="form-group">
            <label for="systemname">系统名称</label>
            <input type="text" v-model="devopsForm.systemname" class="form-control" id="systemname" placeholder="">
          </div>
          <div class="form-group">
            <label for="releasestate">投产状态</label>
            <input type="text" v-model="devopsForm.releasestate" class="form-control" id="releasestate" placeholder="">
          </div>
          <div class="form-group">
            <label for="domain">所属领域</label>
            <input type="text" v-model="devopsForm.domain" class="form-control" id="domain" placeholder="">
          </div>
          <button type="submit" class="btn btn-primary">提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditDevops',
  data () {
    return {
      devopsForm: {
        systemkey: '',
        systemname: '',
        releasestate: '',
        domain: '',
        submitted: false
      }
    }
  },
  methods: {
    getMessage() {
      const path = 'http://localhost:5000/api'
      axios
        .get(path)
        .then(res => {
          this.msg = res.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    onSubmit (e) {
      const path = `http://localhost:5000/api/systeminfos`
      axios.post(path,{
        systemkey: this.devopsForm.systemkey,
        systemname: this.devopsForm.systemname,
        releasestate: this.devopsForm.releasestate,
        domain: this.devopsForm.domain
      })
        .then((response) => {
          this.$router.push({
            name: 'EditDevops',
            params: { systemkey: systemkey }
          })
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    },
  },
  created() {
    this.getMessage()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
