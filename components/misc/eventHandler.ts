import mitt from "mitt"

type Events = {
    openPage : string
}

const emitter = mitt<Events>();

export default emitter;