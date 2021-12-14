<template>
    <div class="nftitemactivityfilter">
        <f-input type="text" :id="inputId" disabled placeholder="Filter" @click.native="onInputClick" />
        <f-popover
            v-if="showModal"
            ref="popover"
            :attach-to="`#${inputId}`"
            attach-position="auto-vertical-exact"
            :attach-margin="[0, 0, 0, 0]"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            hide-on-document-mousedown
            width-as-attach
            class="nftitemactivityfilter_window"
            @window-hide="$emit('window-hide', $event)"
        >
            <f-listbox
                :data="search"
                multiselect
                v-model="selectedItems"
                ref="listbox"
                :focus-item-on-focus="true"
                class="nftitemactivityfilter_flistbox"
                @component-change="onListboxItemSelected"
            >
                <template v-slot="{ item }">
                    <div class="nftitemactivityfilter_listitem" tabindex="0">
                        {{ $t(item.label) }}
                    </div>
                </template>
            </f-listbox>
        </f-popover>
    </div>
</template>

<script>
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import FPopover from 'fantom-vue-components/src/components/FPopover/FPopover.vue';
import { ACTIVITY_TYPES } from '@/common/constants/activity-type-filters.js';
import { getUniqueId, defer } from 'fantom-vue-components/src/utils';

export default {
    name: 'NftItemActivityFilter',
    components: { FListbox, FPopover },

    model: {
        prop: 'selected',
        event: 'change',
    },

    props: {
        selected: {
            type: Object,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            inputId: getUniqueId(),
            showModal: true,
            selectedItems: [],
            data: ACTIVITY_TYPES(),
            search: [
                {
                    label: this.$t('nftitemactivityfilter.auction'),
                    pattern: /AUCTION/i,
                },
                {
                    label: this.$t('nftitemactivityfilter.listing'),
                    pattern: /LISTING/i,
                },
                {
                    label: this.$t('nftitemactivityfilter.offer'),
                    pattern: /OFFER/i,
                },
                {
                    label: this.$t('nftitemactivityfilter.transfer'),
                    pattern: /TRANSFER/i,
                },
            ],
        };
    },

    // watch: {
    //     selected(value) {
    //         console.log('selected: ', value)
    //         let newValue = [];
    //         Object.keys(value).forEach(item => {
    //             let index = this.search.findIndex(searchItem => searchItem.label === item);
    //             if(index !== -1) newValue = newValue.concat(this.search[index]);
    //         });
    //         console.log('newValue: ', newValue)
    //         this.selectedItems = newValue;
    //         //this.selectedItems = value.map(item => item.value);
    //         // let newSelected = [];
    //         // this.search.forEach(searchItem => {
    //         //     let dfadf = Object.keys(value).filter(item => item === searchItem.label)
    //         // });
    //         // this.selectedItems = Object.keys(value);
    //     },
    // },

    methods: {
        onInputClick() {
            this.$nextTick(() => {
                const { $refs } = this;
                $refs.popover.show();
                defer(() => {
                    $refs.listbox.focus();
                });
            });
        },
        onListboxItemSelected(items) {
            let filters = {};
            items.forEach(item => {
                let index = this.search.findIndex(filter => filter.label === item.label);
                let types = ACTIVITY_TYPES().filter(type => this.search[index].pattern.test(type.filter));
                filters[item.label] = types;
            });

            this.$emit('change', filters);
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
