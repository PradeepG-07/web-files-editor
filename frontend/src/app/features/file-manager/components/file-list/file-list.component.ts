import { Component, OnInit } from '@angular/core';
import { Item, SplittedCurrentPath, Tree } from '../../../../core/models/index.model';
import { NgClass, NgFor } from '@angular/common';
import { ItemComponent } from '../item/item.component';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { DirectoryEnum } from '../../../../core/enums';

@Component({
	selector: 'app-file-list',
	imports: [NgFor, ItemComponent, RouterLink, NgClass],
	templateUrl: './file-list.component.html',
	styleUrl: './file-list.component.css',
})
export class FileListComponent implements OnInit {
	currentPath: string;
	splittedCurrentPath: SplittedCurrentPath[];
	itemsTree: Tree = [
		{
			name: 'TEst',
			isDirectory: true,
			size: 200,
			absolutePath: '~/Test',
		},
		{
			name: 'File.txt',
			isDirectory: false,
			size: 100,
			absolutePath: '/data/live/File.txt',
		},
	];
	selectedItems: Item[] = [];
	constructor(private route: ActivatedRoute, private router: Router) {
		this.currentPath = DirectoryEnum.SEPARATOR;
		this.splittedCurrentPath = [
			{
				displayPath: DirectoryEnum.SEPARATOR,
				absolutePath: DirectoryEnum.SEPARATOR,
			},
		];
	}
	ngOnInit(): void {
		this.route.queryParamMap.subscribe((params: ParamMap) => {
			this.setCurrentPath();
			this.splitCurrentPath();
        });
	}
	setCurrentPath(): void {
		const lastVisitedPath = localStorage.getItem('lastVisitedFileManagerPath');
		const queryParamPath = this.route.snapshot.queryParamMap.get('path');
		if (queryParamPath) {
			this.currentPath = queryParamPath;
		} else if (lastVisitedPath) {
			this.currentPath = lastVisitedPath;
			this.router.navigate(['/file-manager'], {
				queryParams: { path: this.currentPath },
			});
		}
		localStorage.setItem('lastVisitedFileManagerPath', this.currentPath);
	}
	splitCurrentPath(): void {
		let splitPath = '';
		this.splittedCurrentPath = this.currentPath
			.split(DirectoryEnum.SEPARATOR).filter((path)=>path.trim()!=="")
			.map((path) => {
				splitPath += path + DirectoryEnum.SEPARATOR;
				return {
					displayPath: path.length == 0 ? DirectoryEnum.SEPARATOR : path,
					absolutePath: splitPath,
				};
			});
		console.log(this.currentPath.split(DirectoryEnum.SEPARATOR).filter((path)=>path.trim()!==""));
		console.log(this.splittedCurrentPath);
		
	}
}
