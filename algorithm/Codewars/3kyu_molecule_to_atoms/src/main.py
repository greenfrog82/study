def parse_molecule(molecule):
    def get_atom(idx):
        # tmp = molecule[idx]
        # idx += 1
        # if not atom and tmp.isalpha() or atom and tmp.islower():
        #     atom += tmp
        #     return get_atom(idx, atom) if len(molecule) > idx else (idx, atom, '') 
        # else:
        #     return (idx, atom, tmp)

        atom = ''
        while len(molecule) > idx:
            curr_ch = molecule[idx]
            idx += 1
            if not atom and curr_ch.isalpha() or atom and curr_ch.islower():
                atom += curr_ch
            else:
                return idx, atom, curr_ch

        return idx, atom, curr_ch


    def calc(idx=0):
        repo = {}

        while len(molecule) > idx:
            idx, atom, curr_ch = get_atom(idx)
            print 'idx : ', idx
            print 'atom : ', atom
            print 'curr_ch : ', curr_ch
            if atom: 
                if curr_ch.isdigit():
                    repo[atom] = repo.get(atom, 1) * int(curr_ch)
                elif curr_ch.isalpha():
                    repo[atom] = repo.get(atom, 0) + 1
                else:
                    

        return idx, curr_ch, repo

    # def parse():
    #     repo = {}
    #     idx, next_ch, pre_ = calc()

    #     if len(molecule) > idx:
    #         parse()
    #     else:
    #         for key, value in pre_repo.iteritems():
        
    # return parse()

    # idx, next_ch, repo = calc()

    # return repo
    # return get_atom(0)
    return calc()

# water = 'H2O'
# print parse_molecule(water) == {'H':2, 'O':1}

magnesium_hydroxide = 'Mg(OH)2'
# print parse_molecule(magnesium_hydroxide) == {'Mg':1, 'O':2, 'H':2}

# fremy_salt = 'K4[ON(SO3)2]2'
# print parse_molecule(fremy_salt) == {'K':4, 'O':14, 'N':2, 'S':4}

# print parse_molecule(water)
print parse_molecule(magnesium_hydroxide)
# print parse_molecule(fremy_salt)
