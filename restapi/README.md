#REST Api definitions go in this folder

 * Create each resource as a separate file and `require` them into `apiDefinition` object.
 * If special handling is not required, a resource object can `Extend` the provided `defaultApi` to inherit the standard verb actions:
   * (get all, get by id, post new, put changes, delete)