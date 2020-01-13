/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.await_expressions_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module.code],
        getCodeActions: context => {
            const { sourceFile } = context;
            const changes = textChanges.ChangeTracker.with(context, changes => {
                const exportDeclaration = createExportDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    createNamedExports([]),
                    /*moduleSpecifier*/ undefined,
                    /*isTypeOnly*/ false
                );
                changes.insertNodeAtEndOfScope(sourceFile, sourceFile, exportDeclaration);
            });
            return [createCodeFixActionNoFixId("addEmptyExportDeclaration", changes, Diagnostics.Add_export_to_make_this_file_into_a_module)];
        },
    });
}