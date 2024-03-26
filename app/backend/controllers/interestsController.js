const User = require("../models/userModel");

/**
 * We can  create a collection for categories and provide some api to manage categories which will be only available to admin of the application.
 */
const availableInterests = [
    "idgvraw", "fvtdfi", "etnoogi", "uqafle", "egvxofd", "pkornxawra", "jofxyovpdc", "xjeldtjpf", "yzlsfucw", "eflig",
    "elytahwxk", "pbrmdqaes", "zazacoodkm", "ulubkucd", "givbo", "aueaagfrqz", "eulvkia", "yzwtntcb", "slyghbhjks", "llftx",
    "fmeudmtte", "iuiaeqgju", "qoflfyv", "jspsml", "jiebjh", "psvykboo", "qbvqat", "cjjepek", "xyoojz", "pzzatsrzl",
    "ehaoey", "cslfyfhs", "cadskwes", "vvdakergpi", "nqkcesc", "qgowjmejm", "iqfccizwg", "cjrtw", "pazctvxuln", "vxbdwcdat",
    "llcrt", "axknccqddw", "mfugqmei", "fzkoowiydk", "cakkelqu", "fazyyjnidv", "pbgeoxe", "wtxqv", "upbnssw", "alrsa",
    "ucgfltixc", "ofrivyu", "dcricpl", "jtdsxyfglw", "jkrixwtx", "pkrzco", "ktigzhqkw", "gaelboa", "tpgjayy", "polpcg",
    "esuavqkd", "sfnzoy", "lberg", "vuqytaco", "qblycjs", "fzxetlowef", "piiqpxiir", "sreuzwzb", "rdcatvoy", "zoszvgzo",
    "etoxq", "amdqviqetw", "adzpacdmml", "bpjjsuzp", "mrddbvu", "hzipdrw", "xgwrwe", "dwngmm", "oagcyk", "kflmtexh",
    "hooxv", "rfcyw", "xfjfwq", "xrdzjc", "mgartjufg", "swmnzog", "wwoompojs", "qtomodh", "fsohjvfey", "enyad",
    "qjvikrajtb", "liikefl", "vmhekzlx", "enwzsh", "bbckv", "cgomsc", "weyshxgm", "mqeimr", "vokmfk", "jjgzznk"
];

const getInterests = async (req, res) => {
    console.log("reaching here")
    try {
        const user = await User.findOne({ _id: req.userId });
        let userInterests = user.interests;
        const availableInterestWithUserInterests = availableInterests.map((interest) => {
            return {
                name: interest,
                checked: userInterests.includes(interest)
            }
        });

        return res.status(200).send(availableInterestWithUserInterests);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
module.exports = { getInterests, availableInterests }

