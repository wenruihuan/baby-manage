<template>
    <div class="workbench">
        <userInfo v-on:getInfo="getInfo"></userInfo>
        <component :memberId="memberId" @getNum="pageIndexValue" :is="componentList[pageIndex].name"></component>
    </div>
</template>

<script>
import * as api from '../../../api/index'
import userInfo from './userInfo'
import recharge from './recharge'
import billing from './billing'
import activateCard from './activateCard'
export default {
    name: 'workbench',
    components: {
        userInfo,
        billing,
        recharge,
        activateCard,
    },
    data () {
        return {
            memberId: '',
            pageIndex: 1,
            componentList: [
                {
                    name: recharge
                },
                {
                    name: billing
                },
                {
                    name: activateCard
                },
            ]
        }
    },
    methods: {
        getInfo (val) {
            console.log(val);
            this.memberId = val;
        },
        pageIndexValue (val) {
            this.pageIndex = val;
        }
    }
};
</script>

<style scoped>
    .workbench {
        background: #FFF;
        padding: 20px 20px 0;
    }
</style>
