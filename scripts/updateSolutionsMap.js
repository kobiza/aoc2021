const fs = require('fs')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const solutionsDir = path.resolve(rootDir, 'src', 'solutions')
const targetFilePath = path.resolve(solutionsDir, 'solutionsMap.js')


const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

const getMapFileContent = (daysFolders) => {
    const imports = daysFolders.map(day => {
        return `import ${day} from './${day}/index'`
    }).join('\n')
    const list = daysFolders.map(day => {
        return `\t${day},`
    }).join('\n')

    return `${imports}

export default {
${list}
}`
}

const updateSolutionMap = () => {
    const content = getMapFileContent(getDirectories(solutionsDir))

    fs.writeFile(targetFilePath, content, err => {
        if (err) {
            console.error(err)
        }
    })
}

updateSolutionMap()
