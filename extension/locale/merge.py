#!/usr/bin/env python

def merge_file(fn):
    cn_pairs = {}
    cn_f = open('zh-CN/%s' % fn)
    lines = cn_f.readlines()
    cn_f.close()
    lines = [line for line in lines if line.strip() and not line.startswith('#')]
    for line in lines:
        k, v = line.split('=', 1)
        cn_pairs[k] = v

    en_f = open('en-US/%s' % fn)
    cn_f = open('zh-CN/%s' % fn, 'w')
    lines = en_f.readlines()
    en_f.close()
    for line in lines:
        if not line.strip() or line.startswith('#'):
            cn_f.write(line)
        else:
            k, v = line.split('=', 1)
            if k in cn_pairs:
                v = cn_pairs[k]
            cn_f.write('%s=%s' % (k, v))
    cn_f.close()

for fn in ['cookies.properties', 'firebug.properties', 'firebug-amo.properties', 'firebug-tracing.properties']:
    merge_file(fn)
