import { parse, join } from "path";
import { createWriteStream, write } from "fs";
import {URL} from '../../config';

export default {
  Query: {
    info: (parent,args,context,info) => {
      return "Well the image is uploaded, and this is its info !!"},
  },

  Mutation: {
    imageUploader: async (p, { file }, c, i) => {
      let { filename, createReadStream } = await file;
      let stream = createReadStream();
      let {ext, name}=parse(filename)
      name=name.replace(/([^a-z0-9 ]+)/gi,'-').replace(' ','_');
      let serverFile= join(__dirname,`../../Uploads/${name}-${Date.now()}.${ext}`);
      let writeStream = await createWriteStream(serverFile);
      await stream.pipe(writeStream);
      serverFile = `${URL}${serverFile.split('Uploads')[1]}`

      return serverFile;
    },
  },
};
