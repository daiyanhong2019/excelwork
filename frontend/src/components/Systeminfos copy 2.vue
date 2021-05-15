<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-10">
                <h1>系统信息</h1>
                <hr><br><br>
                <button type="button" class="btn btn-success btn-sm" v-b-modal.systeminfo-modal>Add Systeminfo</button>
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
            <div>
                <b-form-select v-model="addSystemInfoForm.selecteddomain" :options="optionsdomain"></b-form-select>
                <!-- <b-form-select v-model="selecteddomain" :options="optionsdomain" size="sm" class="mt-3"></b-form-select> -->
                <div class="mt-3">Selected: <strong>{{ addSystemInfoForm.selecteddomain }}</strong></div>
            </div>
            <div>
                <b-form-select v-model="addSystemInfoForm.selectedstate" :options="optionsstate"></b-form-select>
                <div class="mt-3">Selected: <strong>{{ addSystemInfoForm.selectedstate }}</strong></div>
            </div>
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
import Alert from './Alert.vue'

export default {
    data() {
        return {
            systeminfos: [],
            selectedstate: null,
            optionsstate: [
            { value: null, text: 'Please select an option' },
            { value: '在建', text: '在建' },
            { value: '下线', text: '下线' },
            { value: '投产', text: '投产' }
            ], 
            selecteddomain: null,
            optionsdomain: [
            { value: null, text: 'Please select an option' },
            { value: '工程效率域', text: '工程效率域' },
            { value: '电子银行域', text: '电子银行域' },
            { value: '技术平台域', text: '技术平台域' }
            ],
                    
            addSystemInfoForm: {
                systemkey: "",
                systemname: "",
                selecteddomain: [],
                selectedstate: []
                
            },
            message: '',
        };
    },
    components: {
        alert: Alert,
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
            this.addSystemInfoForm.releasestate = ""
            this.addSystemInfoForm.domain = ""
        },
        onSubmit(evt) {
            evt.preventDefault()
            this.$refs.addSystemInfoModal.hide()
            const payload = {
                systemkey: this.addSystemInfoForm.systemkey,
                systemname: this.addSystemInfoForm.systemname,
                releasestate: this.addSystemInfoForm.selectedstate,
                domain: this.addSystemInfoForm.selecteddomain
            };
            this.addSystemInfo(payload)
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
