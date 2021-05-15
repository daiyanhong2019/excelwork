<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-10">
                <h1>系统信息</h1>
                <hr><br><br>
                <button type="button" class="btn btn-success btn-sm" v-b-modal.systeminfo-modal>Add Book</button>
                <br><br>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">系统标识</th>
                            <th scope="col">系统名称</th>
                            <th scope="col">投产状态</th>
                            <th scope="col">所属领域</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(systeminfo, index) in systeminfos" :key="index">
                            <td>{{ systeminfo.systemkey }}</td>
                            <td>{{ systeminfo.systemname }}</td>
                            <td>{{ systeminfo.releasestate }}</td>
                            <td>{{ systeminfo.domain }}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-warning btn-sm">Update</button>
                                    <button type="button" class="btn btn-danger btn-sm ml-2">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <b-modal ref="addSystemInfoModal" id="systeminfo-modal" title="Add a new system" hide-footer>
            <b-form @submit="onSubmit" @reset="onReset" class="w-100">
            <b-form-group id="form-systemkey-group" label="系统标识：" label-for="form-systemkey-input">
                <b-form-input
                    id="form-systemkey-input"
                    type="text"
                    v-model="addSystemInfoForm.systemkey"
                    required
                    placeholder="Enter systemkey"></b-form-input>
            </b-form-group>
            <b-form-group id="form-systemname-group" label="系统名称：" label-for="form-systemname-input">
                <b-form-input
                    id="form-systemname-input"
                    type="text"
                    v-model="addSystemInfoForm.systemname"
                    required
                    placeholder="Enter systemname">
                </b-form-input>
            </b-form-group>
            <b-form-group id="form-releasestate-group" label="投产状态：" label-for="form-releasestate-input">
                <b-form-select
                    id="form-releasestate-input"
                    v-model="addSystemInfoForm.releasestate"
                    :options="releasestates"
                    value-field="id"
                    text-field="name"
                    />
            </b-form-group>
            <b-form-group id="form-domain-group" label="所属领域：" label-for="form-domain-input">
                <b-form-select
                    id="form-domain-input"
                    v-model="addSystemInfoForm.domain"
                    :options="domains"
                    value-field="id"
                    text-field="name"
                    />
            </b-form-group>
            <b-button-group>
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-button-group>
            </b-form>
        </b-modal>
    </div>    
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            systeminfos: [],
            releasestate: "",
            releasestates: [],
            domain: "",
            domains: [],            
            addSystemInfoForm: {
                systemkey: "",
                systemname: "",
                releasestate: [],
                domain:[]
            }
        };
    },
    methods: {
        getSysteminfos() {
            const path = "http://localhost:5000/api/systeminfos"
            axios
                .get(path)
                .then(res => {
                    this.systeminfos = res.data.items
                    console.log(this.systeminfos)
                })
                .catch(error => {
                    console.error(error)
                })
        },
   
        addSystemInfo(payload) {
            const path = "http://localhost:5000/api/systeminfos"
            axios
                .post(path, payload)
                .then(() => {
                    this.getSysteminfos()
                })
                .catch(error => {
                    console.log(error)
                    this.getSysteminfos()
                });
        },
        initForm() {
            this.addSystemInfoForm.systemkey = ""
            this.addSystemInfoForm.systemname = ""
            this.addSystemInfoForm.releasestate = []
            this.addSystemInfoForm.domain = []
            const releasestates = [{ id: 1, name: "投产" }, { id: 2, name: "在建" }, { id: 2, name: "下线" }]
            var releasestatesSelectList = []
            releasestates.forEach((releasestate, index, mechanicsArray) => {
                var selectListOption = {
                    value: releasestate,
                    text:  releasestate.name
                    }
                releasestatesSelectList.push(selectListOption)
            })
            const domains = [{ id: 1, name: "工程效率域" }, { id: 2, name: "电子银行域" }, { id: 2, name: "基础运营域" }]
            var domainsSelectList = []            
            domains.forEach((domain, index, mechanicsArray) => {
                var selectListOption = {
                    value: domain,
                    text:  domain.name
                    }
                domainsSelectList.push(selectListOption)
            })
        },
        onSubmit(evt) {
            evt.preventDefault()
            this.$refs.addSystemInfoModal.hide()
            const payload = {
                systemkey: this.addSystemInfoForm.systemkey,
                systemname: this.addSystemInfoForm.systemname,
                releasestate: this.addSystemInfoForm.releasestate,
                domain: this.addSystemInfoForm.domain
            };
            this.addSystemInfoForm(payload)
            this.initForm()
        },
        onReset(evt) {
            evt.preventDefault()
            this.$refs.addSystemInfoModal.hide()
            this.initForm()
         }
    },
    created() {
        this.getSysteminfos()
    }
}
</script>
