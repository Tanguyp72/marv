<script>
  import { _ } from "@/libs/i18next";
  import { createEventDispatcher } from "svelte";
  import { transDefs } from "../../../libs/settings";

  import Panel from "../Panel.svelte";
  import Input from "../Input.svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import Select from "@/components/UI/Select.svelte";
  import MdAddBox from "svelte-icons/md/MdAddBox.svelte";

  export let trans;

  const dispatch = createEventDispatcher();

  let itemTransNames = [];

  $: itemTransNames = trans.map(([key]) => key);
  $: transNames = Object.keys(transDefs)
    .filter((key) => !itemTransNames.includes(key))
    .map((val) => ({ val, key: humanLabel(val) }));
  $: selectedTrans = (transNames[0] && transNames[0].val) || "";

  function onChange(key, { target }) {
    dispatch("change", { key, value: target.value });
  }

  function onRemove(key) {
    dispatch("remove", { key });
  }

  function onSelectTrans({ detail }) {
    selectedTrans = detail;
  }

  function onAdd() {
    if (!selectedTrans) return;
    const key = selectedTrans;
    dispatch("change", { key, value: transDefs[key].default });
  }

  function humanLabel(label) {
    return _(`labels.${label}`);
  }
</script>

<Panel title="{_('words.transformations')}" {...$$restProps}>
  {#if transNames.length}
    <div class="p-2 space-x-2 flex items-center">
      <Select
        object="{true}"
        rootClass="w-full"
        inputClass="flex-auto rounded"
        items="{transNames}"
        value="{selectedTrans}"
        on:change="{onSelectTrans}"
      />
      <div on:click="{onAdd}" class="cursor-pointer hover:text-blue-600">
        <Icon icon="{MdAddBox}" />
      </div>
    </div>
  {/if}
  {#each trans as [key, value] (key)}
    <Input
      label="{humanLabel(key)}"
      value="{value}"
      removable="{true}"
      {...transDefs[key].input}
      on:change="{onChange.bind(null, key)}"
      on:remove="{onRemove.bind(null, key)}"
    />
  {/each}
</Panel>
