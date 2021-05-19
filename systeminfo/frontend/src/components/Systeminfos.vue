<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-10">
                <h1>系统信息</h1>
                <hr><br><br>
                <alert :message="message" v-if="showMessage"></alert>
                <button type="button" class="btn btn-success btn-sm" v-b-modal.systeminfo-modal>Add Systeminfo</button>
                <br><br>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">系统标识</th>
                            <th scope="col">系统名称</th>
                            <th scope="col">所属领域</th>
                            <th scope="col">投产状态</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(systeminfo, index) in systeminfos" :key="index">
                            <td>{{ systeminfo.systemkey }}</td>
                            <td>{{ systeminfo.systemname }}</td>
                            <td>{{ systeminfo.domain }}</td>
                            <td>{{ systeminfo.releasestate }}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button 
                                        type="button" 
                                        class="btn btn-warning btn-sm" 
                                        v-b-modal.systeminfo-update-modal 
                                        @click="editSysteminfo(systeminfo)">更新</button>
                                    <button type="butto" class="btn btn-danger btn-sm">删除</button>
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
                <!-- <b-form-select v-model="addSystemInfoForm.selecteddomain" :options="optionsdomain" size="sm" class="mt-3"></b-form-select> -->
                <!-- <div class="mt-3">Selected: <strong>{{ addSystemInfoForm.selecteddomain }}</strong></div> -->
            </div>
            <div>
                <b-form-select v-model="addSystemInfoForm.selectedstate" :options="optionsstate"></b-form-select>
                <!-- <b-form-select v-model="addSystemInfoForm.selectedstate" :options="selectedstate" size="sm" class="mt-3"></b-form-select> -->
                <!-- <div class="mt-3">Selected: <strong>{{ addSystemInfoForm.selectedstate }}</strong></div> -->
            </div>
            <b-button-group>
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-button-group>
            </b-form>
        </b-modal>  
        <!--edit systeminfo modal-->
        <b-modal ref="editSysteminfoModal"
                 id="systeminfo-update-modal"
                 title="Update"
                 hide-footer>
        <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
        <b-form-group id="form-systemkey-edit-group"
                       label="Systemkey:"
                       label-for="form-systemkey-edit-input">
            <b-form-input id="form-systemkey-edit-input"
                           type="text"
                           v-model="editForm.systemkey"
                           required
                           placeholder="Enter systemkey">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-systemname-edit-group"
                       label="Systemname:"
                       label-for="form-systemname-edit-input">
            <b-form-input id="form-systemname-edit-input"
                           type="text"
                           v-model="editForm.systemname"
                           required
                           placeholder="Enter systemname">
            </b-form-input>
        </b-form-group>
        <div>
            <b-form-group id="form-domain-edit-group"
                       label="Domain:"
                       label-for="form-domain-edit-input">
            <b-form-select v-model="editForm.selecteddomain" :options="optionsdomain" id="form-domain-edit-group"></b-form-select>
            </b-form-group>
        </div>
        <div>
            <b-form-group id="form-releasestate-edit-group"
                       label="Releasestate:"
                       label-for="form-releasestate-edit-group">
            <b-form-select v-model="editForm.selectedstate" :options="optionsstate" id="form-releasestate-edit-group"></b-form-select>
            </b-form-group>
        </div>
        <b-button-group>
            <b-button type="submit" variant="primary">Update</b-button>
            <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
        </b-form>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import Alert from './Alert'

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
            editForm: {
                id: "",
                systemkey: "",
                systemname: "",
                selecteddomain: [],
                selectedstate: []
                
            },
            message: '',
            showMessage: false,
        }
    },
    methods: {
        getSysteminfos() {
            const path = 'http://localhost:5000/systeminfos'
            axios.get(path)
                .then((res) => {
                    this.systeminfos = res.data.items
                })
                .catch((error) => {
                    console.error(error)
                })
        },
         addSystemInfo(payload) {
            const path = 'http://localhost:5000/systeminfos'
            axios.post(path, payload)
                .then(() => {
                    this.getSysteminfos()
                    this.message = 'System added!'
                    this.showMessage = true
                })
                .catch((error) => {
                    console.log(error)
                    this.getSysteminfos()
                });
        },
        updateSysteminfo(payload, systemid) {
            const path = `http://localhost:5000/systeminfos/${systemid}`
            axios.put(path, payload)
                .then(() => {
                    this.getSysteminfos()
                    this.message = 'Systeminfo updated!'
                    this.showMessage = true
                })
                .catch((error) => {
                    console.error(error)
                    this.getSysteminfos()
                })
        },
        editSysteminfo(systeminfo) {
            this.editForm = systeminfo
            this.editForm.selectedstate = systeminfo.releasestate
            this.editForm.selecteddomain = systeminfo.domain
        },
        initForm() {
            this.addSystemInfoForm.systemkey = ""
            this.addSystemInfoForm.systemname = ""
            this.addSystemInfoForm.releasestate = []
            this.addSystemInfoForm.domain = []
            this.editForm.systemkey = ""
            this.editForm.systemname = ""
            this.editForm.releasestate = []
            this.editForm.domain = []
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
        onSubmitUpdate(evt) {
            evt.preventDefault()
            this.$refs.editSysteminfoModal.hide()
            const payload = {
                systemkey: this.editForm.systemkey,
                systemname: this.editForm.systemname,
                releasestate: this.editForm.selectedstate,
                domain: this.editForm.selecteddomain
            }
            this.updateSysteminfo(payload, this.editForm.id)
        },
        onReset(evt) {
            evt.preventDefault()
            this.$refs.addSystemInfoModal.hide()
            this.initForm()
        },
        onResetUpdate(evt) {
            evt.preventDefault()
            this.$refs.editSysteminfoModal.hide()
            this.initForm()
            this.getSysteminfos()
        }
    },
    components: {
        alert: Alert,
    },
    created() {
        this.getSysteminfos()
    },
}
</script>