<template>
    <div class="nftitemactivity">
        <NftItemActivityFilter v-model="filters" />
        <NftItemActivityFilterChips v-model="filters" />
        <f-data-grid
            no-header
            max-height="400px"
            sticky-head
            class="agrid"
            :items="items"
            :columns="itemsColumns"
            :use-pagination="false"
            :total-items="items.length"
        >
            <template #column-unitPrice="{ item, value }">
                <a-token-value
                    :token="item.payToken"
                    :value="value"
                    :fraction-digits="2"
                    :use-placeholder="false"
                    no-symbol
                />
            </template>
            <template #column-fromUser="{ value }">
                <router-link :to="{ name: 'account', params: { address: value.address } }">
                    <a-address :address="value.address" :name="value.username" :image="value.avatarThumb" />
                </router-link>
            </template>
            <template #column-toUser="{ value }">
                <router-link v-if="value !== null" :to="{ name: 'account', params: { address: value.address } }">
                    <a-address :address="value.address" :name="value.username" :image="value.avatarThumb" />
                </router-link>
            </template>
            <template #column-time="{ value }">
                <div>
                    {{ value }}
                </div>
            </template>
        </f-data-grid>
    </div>
</template>
<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import AAddress from '@/common/components/AAddress/AAddress.vue';
import { getTokenActivity } from '@/modules/nfts/queries/token-activity.js';
import { datetimeFormatter } from '@/utils/formatters.js';

import NftItemActivityFilter from '@/modules/nfts/components/NftItemActivityFilter/NftItemActivityFilter.vue';
import NftItemActivityFilterChips from '@/modules/nfts/components/NftItemActivityFilterChips/NftItemActivityFilterChips.vue';

export default {
    name: 'NftItemActivity',

    components: { FDataGrid, AAddress, ATokenValue, NftItemActivityFilter, NftItemActivityFilterChips },

    data() {
        return {
            filters: {},
            itemsColumns: [
                {
<<<<<<< HEAD:src/modules/nfts/components/NftHistoryGrid/NftHistoryGrid.vue
=======
                    name: 'type',
                    label: this.$t('nfthistorygrid.event'),
                    formatter(value) {
                        return _this.$t('nfthistorygrid.types.' + value);
                    },
                },
                {
>>>>>>> 6b4b278... Activity Item table:src/modules/nfts/components/NftItemActivity/NftItemActivity.vue
                    name: 'unitPrice',
                    label: this.$t('nfthistorygrid.price'),
                },
                {
                    name: 'fromUser',
                    label: this.$t('nfthistorygrid.from'),
                },
                {
                    name: 'toUser',
                    label: this.$t('nfthistorygrid.to'),
                },
                {
                    name: 'time',
                    label: this.$t('nfthistorygrid.date'),
                    formatter(value) {
                        return datetimeFormatter(value);
                    },
                },
            ],
            items: [],
        };
    },

<<<<<<< HEAD:src/modules/nfts/components/NftHistoryGrid/NftHistoryGrid.vue
    created() {
        this.init();
    },

    methods: {
        async init() {
            const routeParams = this.$route.params;
            let values = await getTokenActivity(
                routeParams.tokenContract,
                routeParams.tokenId,
                this.filterToQuery(filter)
            );
            this.items = this.transformData(values);
=======
    computed: {
        dFilters() {
            return Object.values(this.filters)
                .flat()
                .map(item => item.filter);
        },
    },

    watch: {
        token: {
            async handler(value, oldValue) {
                if (value.contract && !objectEquals(value, oldValue)) {
                    if (this.items.length > 0) {
                        this.update();
                    } else {
                        await this.loadActivities();
                    }
                }
            },
            immediate: true,
        },
        dFilters() {
            this.update();
        },
    },

    methods: {
        async loadPage(pagination = { first: this.perPage }) {
            const { token } = this;

            return await getTokenActivity(token.contract, token.tokenId, pagination, this.filterToQuery(this.dFilters));
>>>>>>> 6b4b278... Activity Item table:src/modules/nfts/components/NftItemActivity/NftItemActivity.vue
        },

        transformData(values) {
            return values.edges.map(item => item.node);
        },

        filterToQuery(value) {
            if (value) {
                return { filter: { types: value } };
            }
            return {};
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
