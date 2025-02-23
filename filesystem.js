

class FileSystem {
    constructor() {
        this.root = new Folder('');
    }

    read(path) {
        let subPaths = this.parsePath(path);
        let temp = this.root;
        for(let i=0; i<subPaths.length; i++){
            const subPath = subPaths[i];
            if(temp.getType() === 'folder') {
                temp = temp.read(subPath);
            } else {
                throw new TypeError('File or Folder not found: ' + subPath);
            }
        }

        return temp;
    }

    save(path, systemObject) {
        let temp = this.root;
        for(let i=0; i< systemObject.getType() === 'file' ? path.length - 1 : path.length; i++){
            const subPath = path[i];
            if(temp.getType() === 'folder') {
                temp = temp.read(subPath);
            } else {
                throw new TypeError('Folder not found: ' + subPath);
            }
        }

        temp.save(systemObject);
    }

    parsePath(path) {
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
        super(name, 'file');
        this.content = content;
    }

    amend(newContent) {
        this.content = newContent;
    }
}

class Folder extends FileSystemObject {
    constructor(name) {
        super(name, 'folder');
        this.contents = new Map();
    }

    read(name) {
        return this.contents.get(name);
    }

    save(systemObject) {
        this.contents.set(systemObject.name, systemObject);
    }
}


function createFile(name, content) {
    return new File(name, content);
}

function createFolder(name) {
    return new Folder(name);
}

function write(path, systemObject) {

}

function read(path) {

}

const file = new File('test.txt', 'testing');

console.log(file);

const fileSystem = new FileSystem();
fileSystem.save('', file);
const fromDisk = fileSystem.read('test.txt');
console.log(fromDisk);
