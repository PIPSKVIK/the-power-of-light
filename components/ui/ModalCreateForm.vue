<template>
  <div class="form-modal rounded overflow-hidden shadow-lg p-5">
    <div class="form-modal__wrapper flex justify-between">
      <div class="form-modal__menu w-2/4">
        <h3>Menu</h3>
        <hr />
        <ul class="pt-2">
          <BaseButton class="mb-3" @click="createNewObj"
            >Create new object</BaseButton
          >
          <li
            v-for="item in objectList"
            :key="item.name"
            class="form-modal__object-item mb-3"
          >
            <div class="form-modal__object-list-actions">
              <BaseIconButton
                deleted
                class="mr-1"
                @click="deleteObj(item.name)"
              />
              <BaseIconButton
                selected
                class="bg-green-700 hover:bg-green-600"
                @click="selectObject(item)"
              />
            </div>
            <span class="text-xs">name: {{ item.name }}</span>
            <span class="text-xs">files_ids: </span>
            <ul>
              <li v-for="(file, idx) in item.files_ids" :key="idx">
                <span>
                  {{ idx + 1 }}
                  {{ file.upload.uuid ? file.upload.uuid : 'umpty' }}</span
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="form-modal__selected-object w-2/4 ml-5">
        <h3>Selected object</h3>
        <hr />
        <ul v-if="selectedObject.name" class="mt-14">
          <li>object-name: {{ selectedObject.name }}</li>
          <div id="myBar"></div>
          <li
            v-for="(selectItem, idx) in selectedObject.files_ids"
            :key="idx"
            class="form-modal__selected-object-wrap"
          >
            <span>{{ idx + 1 }}: {{ selectItem.upload.uuid }}</span>
          </li>
          <dropzone
            id="dropzone"
            ref="myDropzone"
            :options="dropzoneOptions"
            @vdropzone-success="onSuccess"
            @vdropzone-queue-complete="startSubmit = true"
          />
        </ul>
      </div>
    </div>

    <BaseLoader :visible="isLoading" full />
    <ModalSuccess :show="showSuccessModal" @closeModal="showSuccessModal = false" />
  </div>
</template>

<script>
import { generatedRandomId } from '@/helpers/uuidRandom'
import { delay } from '@/helpers/delay'
import { BaseButton, BaseIconButton, BaseLoader, ModalSuccess } from '@/components/ui'

export default {
  name: 'ModalCreateForm',

  components: {
    BaseButton,
    BaseIconButton,
    BaseLoader,
    ModalSuccess
  },

  data() {
    return {
      showSuccessModal: false,
      startSubmit: false,
      isLoading: false,
      selectedObject: [],
      objectList: [],
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 1,
        headers: { 'My-Awesome-Header': 'header value' },
      },
      dropZone: null,
    }
  },

  watch: {
    startSubmit(value) {
      if (value) {
        this.submitForm()
      }
    },
  },

  methods: {
    createNewObj() {
      const newObj = {
        name: generatedRandomId(),
        files_ids: [],
      }
      this.objectList.push(newObj)
    },
    deleteObj(delId) {
      this.objectList = this.objectList.filter((t) => t.name !== delId)
    },
    selectObject(selectItem) {
      this.selectedObject = {
        ...selectItem,
      }
    },

    async delayedLog(item) {
      await delay()
      // fake network process status
      console.log(item);
    },

    onSuccess(e) {
      const files = this.$refs.myDropzone.getAcceptedFiles()
      this.selectedObject.files_ids = files

      // eslint-disable-next-line array-callback-return
      this.objectList.filter((item) => {
        if (this.selectedObject.name === item.name) {
          item.files_ids = files
        }
      })
    },
    async submitForm() {
      const array = this.selectedObject.files_ids
      this.isLoading = true

      try {
        for (const item of array) {
          await this.delayedLog(item)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
        this.deleteObj(this.selectedObject.name)
        this.selectedObject = []
        this.$refs.myDropzone.removeAllFiles()
        this.startSubmit = false
        this.showSuccessModal = true
      }
    },
  },
}
</script>

<style scoped>
.form-modal {
  width: 1000px;
  min-height: 500px;
}
.form-modal__object-item {
  @apply flex flex-col p-2;
  border: 1px solid gray;
  position: relative;
  border-radius: 5px;
}
.form-modal__object-list-actions {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}
</style>
