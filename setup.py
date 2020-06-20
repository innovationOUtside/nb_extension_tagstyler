import setuptools

setuptools.setup(
    name="nb_extension_tagstyler",
    packages=['tagstyler'],
    version='0.0.1',
    include_package_data=True,
    install_requires=[
        'notebook'
    ],
    data_files=[
        # like `jupyter nbextension install --sys-prefix`
        ("share/jupyter/nbextensions/tagstyler", [
            "tagstyler/static/index.js", "tagstyler/static/tagstyler.yaml"
        ]),
        # like `jupyter nbextension enable --sys-prefix`
        ("etc/jupyter/nbconfig/notebook.d", [
            "jupyter-config/nbconfig/notebook.d/tagstyler.json"
        ])
    ],
    zip_safe=False
)