import setuptools
from os import path

def get_long_description():
    with open(
        path.join(path.dirname(path.abspath(__file__)), "README.md"),
        encoding="utf8",
    ) as fp:
        return fp.read()

setuptools.setup(
    name="nb_extension_tagstyler",
    packages=['tagstyler'],
    version='0.0.2',
    include_package_data=True,
    install_requires=[
        'notebook'
    ],
    description="Style classic notebook cells according to simple bootstrap style cell tags.",
    long_description=get_long_description(),
    long_description_content_type="text/markdown",
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