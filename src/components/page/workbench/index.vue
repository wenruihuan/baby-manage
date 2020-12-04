<template>
    <div class="workbench">
        <userInfo ref="userInfoBox" v-on:getInfo="getInfo"></userInfo>
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
    created () {
        this.operationState = this.$route.query.operationState;
        this.comeFrom = this.$route.query.comeFrom;
        if (this.operationState === 'activateCard' || this.comeFrom === 'activateCard') {
            this.pageIndex = 2;
        } else if (this.comeFrom === 'recharge') {
            this.pageIndex = 0;
        } else if (this.comeFrom === 'billing') {
            this.pageIndex = 1;
        }
    },
    mounted () {
        if (this.$route.query.id) {
            this.$refs.userInfoBox.getWorktableMemberInfo(this.$route.query.id).then(() => {
                this.$refs.userInfoBox.getWorktableMemberAllRechargeCard(this.$route.query.id);
            });
        }
    },
    methods: {
        getInfo (val) {
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
