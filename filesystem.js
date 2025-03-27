

const FileType = Object.freeze({
    folder: 'folder',
    file: 'file',
})

class FileSystem {
    constructor() {
        this.root = new Folder('');
    }

    read(path) {
        let subPaths = this.parsePath(path);
        let temp = this.root;
        for(let i=0; i<subPaths.length; i++){
            const subPath = subPaths[i];
            if(temp.getType() === FileType.folder) {
                temp = temp.read(subPath);
            } else {
                throw new TypeError('File or Folder not found: ' + subPath);
            }
        }

        return temp;
    }

    save(path, systemObject) {
        let subPaths = this.parsePath(path);
        let temp = this.root;
        for(let i=0; i<subPaths.length; i++){
            const subPath = subPaths[i];
            if(temp.getType() === FileType.folder) {
                temp = temp.read(subPath);
            } else {
                throw new TypeError('Folder not found: ' + subPath);
            }
        }

        temp.save(systemObject);
    }

    parsePath(path) {
        if(path === ''){
            return [];
        }
        return path.split('/');
    }
}

class FileSystemObject {
    constructor(name, type) {
        if (new.target == FileSystemObject) {
            throw new TypeError('cannot instantiate abstract FileSystemObject');
        }

        this.name = name;
        this.type = type;;
    }

    getType() {
        return this.type;
    }
}

class File extends FileSystemObject {
    constructor(name, content) {
        super(name, FileType.file);
        this.content = content;
    }

    amend(newContent) {
        this.content = newContent;
    }
}

class Folder extends FileSystemObject {
    constructor(name) {
        super(name, FileType.folder);
        this.contents = new Map();
    }

    read(name) {
        return this.contents.get(name);
    }

    save(systemObject) {
        this.contents.set(systemObject.name, systemObject);
    }
}

const file = new File('test.txt', 'testing');
const folder = new Folder('notes');
const fileSystem = new FileSystem();
console.log(fileSystem);
fileSystem.save('', folder);
console.log(fileSystem);
fileSystem.save('notes', file);
console.log(fileSystem);
const fromDisk = fileSystem.read('notes/test.txt');
console.log(fromDisk);
fromDisk.amend('changed');
fileSystem.save('notes', file);
console.log(fileSystem.read('notes/test.txt'));

const test = ['a', 'b'];

for(letter of test){
    console.log(letter);
}
