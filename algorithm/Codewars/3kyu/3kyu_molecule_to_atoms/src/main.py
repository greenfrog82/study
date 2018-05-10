import re

def parse_molecule(formular):
    p = re.compile(r'[A-Z][a-z]*|[\[|\{|\(|\]|\}|\]\)]|[0-9]*')
    arr = p.findall(formular)
    print arr

    def parse(idx=0):
        repo = {}
        # atom = None
        
        while(len(arr) > idx):
            # import pdb; pdb.set_trace()
            item = arr[idx]
            idx += 1
            if item.isalpha():
                tmp = arr[idx]
                if tmp.isdigit():
                    repo[item] = repo.get(item, 0) + int(tmp)
                    idx += 1
                else:
                    repo[item] = repo.get(item, 0) + 1
            elif item in ['[', '{', '(']:
                idx, pre_repo = parse(idx)
                for key, value in pre_repo.iteritems():
                    repo[key] = repo.get(key, 0) + value
            else:
                if len(arr) > idx:
                    item = arr[idx]
                    if item.isdigit():
                        for key, value in repo.iteritems():
                            repo[key] = value * int(item)
                        idx += 1
                return idx, repo

        return idx, repo

    _, repo = parse()
    print repo
    return repo

water = 'H2O'
print parse_molecule(water) == {'H':2, 'O':1}

magnesium_hydroxide = 'Mg(OH)2'
print parse_molecule(magnesium_hydroxide) == {'Mg':1, 'O':2, 'H':2}

fremy_salt = 'K4[ON(SO3)2]2'
print parse_molecule(fremy_salt) == {'K':4, 'O':14, 'N':2, 'S':4}

glucose = 'C6H12O6'
print parse_molecule(glucose) == {'H': 12, 'C': 6, 'O': 6}

a = '(C5H5)Fe(CO)2CH3'
print parse_molecule(a) == {'H': 8, 'C': 8, 'Fe': 1, 'O': 2}

# b = '{[Co(NH3)4(OH)2]3Co}(SO4)3'
# print parse_molecule(b) == {'H': 42, 'S': 3, 'Co': 3, 'O': 18, 'N': 12}
